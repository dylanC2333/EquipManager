<template>
	<tm-text :font-size="48" _class="text-weight-b" label="设备使用列表"></tm-text>
	<tm-sheet>
		<tm-text :font-size="30" _class="text-weight-b" label="请输入搜索关键字"></tm-text>
		<tm-input v-model="searchObj.keyword" placeholder="设备编号/操作人编号/任务编号"></tm-input>
		<view class="flex flex-row flex-wrap">
			<tm-button :font-size="35" :margin="[10]" @click="fetchData()" size="normal">搜索</tm-button>
			<tm-button :font-size="35" :margin="[10]" @click="resetData()" size="normal"  outlined >重置</tm-button>
		</view>
		<tm-button color="green" :font-size="35" :margin="[10]" @click="add" size="normal">添加 </tm-button>
	</tm-sheet>
	<tm-sheet>
		<view class="recordTable" style="height: 500px">
			<zb-table
						:show-header="true"
						:columns="column"
						:stripe="true"
						:fit="false"
						:border="true"
						@edit="buttonEdit"
						@remove="removeById"
						@detail="detail"
						:data="list">
			</zb-table>
		</view>
	</tm-sheet>
	
	<tm-app>
			<tm-sheet :padding="[12, 0]" :margin="[0, 0]">
				<tm-pagination v-model:current="pagination.page" @change="handlePageChange" color="primary" :total="pagination.total"></tm-pagination>
			</tm-sheet>
	</tm-app>

	<tm-app ref="app" color="grey-5">
		<tm-modal
			color="white"
			okColor="red"
			cancelColor="red"
			okLinear="left"
			splitBtn
			title="添加/修改"
			:hideCancel="true"
			:closeable="true"
			:width="700"
			:height="1200"
			v-model:show="showModel"
			:zIndex = "zindexNum"
			okText="返回"
		>
			<tm-form ref="form" :label-width="80" @submit="confirm" v-model="sysEquipUse">
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<!-- 不要问我为什么用v-model.lazy，我很受伤。不用.lazy在小程序可能会出现字符闪烁或者输入过快时，字符丢失的问题。 -->
					<!-- <tm-text :font-size ="35" label="设备编号"></tm-text> -->
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					<tm-button @click="scanCode" :margin="[10]" :shadow="0" text size="small" outlined label="扫码获取" :disabled="needScan"></tm-button>
				</tm-form-item>
				<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '请正确填写任务编号格式', validator: validateTaskCode}]" >
					<tm-input :inputPadding="[0, 0]"  v-model.lazy="taskCodeParts.year" :transprent="true" prefixLabel='RW-' placeholder="请输入年份"> </tm-input>
					<tm-input :inputPadding="[49, 0]" v-model.lazy="taskCodeParts.number" :transprent="true" prefixLabel='-' placeholder="请输入序号"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用人编号" field="employeeUseCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :disabled="true" :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.employeeUseCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' , validator: validateDate}]" >
					<tm-cell @click="handleTimePicker"  :right-text="dateStr || '请选择日期'"></tm-cell>
					<tm-time-picker
								:showDetail="{
									year: true,
									month: true,
									day: true,
									hour:false,
									minute:false,
									second:false
								}"
								v-model:show="showdate"
								v-model="dateSAva"
								format="YYYY-MM-DD"
								@cancel="handleTimePickerCancel"
								:defaultValue="dateSAva"
								v-model:model-str="dateStr"
							></tm-time-picker>
				</tm-form-item>
				<tm-form-item required label="地点" field="location" :rules="[{ required: true, message: '必填' , validator: validateLocation}]" >
					<!-- <tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.location" :transprent="true" :showBottomBotder="false"> </tm-input>
				 -->
					<tm-cell @click="handleCityPicker"  :right-text="cityStr || '请选择地点'"></tm-cell>
					<tm-city-picker selectedModel="name" v-model="citydata" v-model:show="showcitydata" v-model:model-str="cityStr" cityLevel="city" ></tm-city-picker>
				 </tm-form-item>
				<tm-form-item required label="设备使用前状态" field="preUseEquipmentStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-radio-group v-model="sysEquipUse.preUseEquipmentStatus">
						<tm-radio label="正常" value="正常"></tm-radio>
						<tm-radio label="异常" value="异常"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item required label="设备使用后状态" field="postUseEquipmentStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-radio-group v-model="sysEquipUse.postUseEquipmentStatus">
						<tm-radio label="正常" value="正常"></tm-radio>
						<tm-radio label="异常" value="异常"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item label="维护保养情况" field="maintenanceStatus" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.maintenanceStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item label="备注" field="remarks" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.remarks" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item :border="false">
					<view class="flex flex-row">
						<view class="flex-1 mr-32">
							<tm-button form-type="submit" label="提交表单" block></tm-button>
						</view>
<!-- 						<view class="flex-1">
							<tm-button :shadow="0" text form-type="reset" label="重置表单" block></tm-button>
						</view> -->
					</view>
				</tm-form-item>
			</tm-form>		
		</tm-modal>
	</tm-app>
	
	<tm-app ref="detailform" color="grey-5">
		<tm-modal
			color="white"
			okColor="blue"
			okLinear="left"
			splitBtn
			title="记录详情"
			hideCancel
			closeable
			:width="700"
			:height="1200"
			v-model:show="showModelDetail"
			okText="返回"
		>
			<tm-form ref="form" :label-width="80" @submit="confirm" v-model="sysEquipUse">
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="设备名称" field="equipmentUseName" :rules="[{ required: true, message: '必填' }]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentUseName" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '请正确填写任务编号格式', validator: validateTaskCode}]" >
					<tm-input disabled :inputPadding="[0, 0]"  v-model.lazy="taskCodeParts.year" :transprent="true" prefixLabel='RW-' placeholder="请输入年份"> </tm-input>
					<tm-input disabled :inputPadding="[49, 0]" v-model.lazy="taskCodeParts.number" :transprent="true" prefixLabel='-' placeholder="请输入序号"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用人编号" field="employeeUseCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.employeeUseCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用人姓名" field="employeeUseName" :rules="[{ required: true, message: '必填' }]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.employeeUseName" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' , validator: validateDate}]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="dateStr" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="地点" field="location" :rules="[{ required: true, message: '必填' , validator: validateLocation}]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="cityStr" :transprent="true" :showBottomBotder="false"> </tm-input>
				 </tm-form-item>
				<tm-form-item required label="设备使用前状态" field="preUseEquipmentStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-radio-group v-model="sysEquipUse.preUseEquipmentStatus">
						<tm-radio disabled label="正常" value="正常"></tm-radio>
						<tm-radio disabled label="异常" value="异常"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item required label="设备使用后状态" field="postUseEquipmentStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-radio-group v-model="sysEquipUse.postUseEquipmentStatus">
						<tm-radio disabled label="正常" value="正常"></tm-radio>
						<tm-radio disabled label="异常" value="异常"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item label="维护保养情况" field="maintenanceStatus" :rules="[{}]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.maintenanceStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item label="备注" field="remarks" :rules="[{}]" >
					<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.remarks" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
			</tm-form>		
		</tm-modal>
	</tm-app>
			

	
</template>

<script setup lang="ts">
	//使用<script setup>，组合式 API 单文件组件，语法糖。所有顶层绑定均能在模板中直接使用。
	import {
		getPageList,
		saveEquipUtilise,
		removeId,
		update,
		getEquipUtiliseById
	} from '@/api/system/equipmentUtilise'
	import { ref , reactive } from 'vue'
	import { taskCodeSplit,taskCodeConcat } from '@/utils/taskCodeFormat'
	import { useMainStore } from '@/store'

	import * as cheerio from 'cheerio'


	//定义数据模型，用于ts类型检查
	interface sysEquipUseType {
	  id?: number;
	  createTime?: string;
	  updateTime?: string;
	  employeeUseCode?: string;
	  employeeUseName?: string | null;
	  equipmentCode?: string;
	  equipmentUseName?: string | null;
	  equipmentUseDate?: string;
	  isAdditional?: number;
	  isDeleted?: number;
	  location?: string;
	  maintenanceStatus?: string;
	  preUseEquipmentStatus?: string;
	  postUseEquipmentStatus?: string;
	  remarks?: string;
	  taskCode?: string;
	}
	interface validateResultType{
		data: sysEquipUseType
		// 所有与form-item绑定的filed字段校验的结果数组。
		result:{
			message:string,//校验后的提示文本
			validator: boolean,//是否校验通过
		}[],
		isPass:boolean //是否校验通过
	}

	//定义响应式变量

	// 地点选择器变量
	const cityStr = ref('')
	const citydata = ref([])
	const showcitydata = ref(false)

	// 日期选择器
	const dateStr = ref('')
	const showdate = ref(false)

	const setToday = () =>{
		const today = new Date()
		const year = today.getFullYear()
		const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始
		const day = String(today.getDate()).padStart(2, '0')
		const formattedDate = `${year}-${month}-${day}`
		return formattedDate
	}


	const dateSAva = ref('')
	const needScan = ref(false)
	const zindexNum = ref(999)

	const list = ref([])//存储获得的数据
	const loading = ref(false)
	const pagination = ref({//存储分页控制数据
		total: 0,
		page: 1,
		limit: 10
	})
	const searchObj = ref({// 查询条件
		keyword: ''
	})
	const sortOption = ref({// 排序条件
		column:'createTime',// 排序字段
		sortorder:'descending'// 升降序条件
	})
	const showModel = ref(false)// 表单显示控制
	const showModelDetail = ref(false) //详情表单显示
	const sysEquipUse = ref<sysEquipUseType>({
		equipmentCode :'',
		taskCode :'',
		employeeUseCode :'',
		equipmentUseDate :'',
		location :'',
		preUseEquipmentStatus :'',
		postUseEquipmentStatus :'',
		maintenanceStatus :'',
	})
	const taskCodeParts = ref<{
		year: string,
		number: string
	}>({// 任务编号组件
		year: '',
		number: ''
	})
	
	const column = reactive([
			  { name: 'operation', type:'operation',fixed:true,label: '操作',renders:[
			      {
			        name:'详情',
					type:'default',
			        func:'detail' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
			      },
				]},
	          { name: 'equipmentCode', label: '设备编号',fixed:false,width:130,emptyString:''},
	          { name: 'equipmentUseName', label: '设备名称',sorter:false,emptyString:''},
	          { name: 'taskCode', label: '任务编号'},
	          { name: 'equipmentUseDate', label: '使用日期' },
	          { name: 'employeeUseCode', label: '使用人编号' },
	          { name: 'employeeUseName', label: '使用人姓名',sorter:true },
	          { name: 'location', label: '地点' },
	          { name: 'preUseEquipmentStatus', label: '设备使用前状态' },
	          { name: 'postUseEquipmentStatus', label: '设备使用前状态' },
	          { name: 'remarks', label: '备注' },
	          { name: 'maintenanceStatus', label: '维护保养情况' },
	          { name: 'operation', type:'operation',label: '操作',renders:[
	              {
	                name:'编辑',
	                func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
	              },
	              {
	                name:'删除',
	                type:'warn',
	                func:"remove"
	              },
	            ]},
	])

	// 从pinia中获取存储的内容
	const mainStore = useMainStore()

	// 点击时间选择器让form不显示，让
	const handleTimePicker = () => {
		// 让form层级变小，让选择器显示

		// // 锁定为当前日期，因此将弹出时间选择器注释
		// zindexNum.value = 10
		// showdate.value = true
		// console.log(citydata.value)
	};

	// 取消时让选择器不显示，把表单的层级写回来
	const handleTimePickerCancel = () =>{
		zindexNum.value = 999
		showdate.value = false
		console.log(dateSAva.value)
		console.log(dateStr.value)
	};


	// 点击地点选择器让form不显示，让
	const handleCityPicker = () => {
		// 让form层级变小，让选择器显示
		zindexNum.value = 10
		showcitydata.value = true

	};

	// 定义页码改变处理函数
	const handlePageChange = (newPage : number) => {
		console.log(newPage);
		pagination.value.page = newPage; // 更新当前页码
		fetchData(newPage); // 使用最新的页码调用 fetchData
	};

	// 地点格式处理，从数组中拼接
	const cityFormat = (cityString: string) =>{
		// 如果字符串包含 `/`，将其替换为空字符串
		const formattedCity = cityString.replace("/", "");
		return formattedCity.trim(); // 确保去除两端多余的空格
	}

	// 日期校验
	const validateDate = () =>{
		if (!dateStr.value) {
			return false
		} else{
			return true
		}
	}
	
	// 扫码处理函数
	const scanCode = () =>  {
	    uni.scanCode({
	        success: function (res: { scanType: string; result: string }): void{
	            console.log('条码类型：' + res.scanType);
	            console.log('条码内容：' + res.result);

	            uni.request({
	                url: res.result, //仅为示例，并非真实接口地址
	                success(requestRes) {
	                    const resData = requestRes.data;
	                    console.log(typeof resData);
	                    // 处理resData,在里面查找想要的内容，并打印出来
	                    // 使用 cheerio 加载 HTML 字符串
	                    const $ = cheerio.load(resData as string); // 虽然本来就是string, 但是不转换会报错。也许是因为允许的参数中不全部一样

	                    // 查找设备编号对应的 <span> 内容
	                    const deviceNumber = $('div.lr-form-item-title:contains("设备编号")').next('span').text();
	                    sysEquipUse.value.equipmentCode = deviceNumber;
	                    // 输出设备编号
	                    console.log(sysEquipUse.value.equipmentCode);
	                    // buttonText = deviceNumber; // Assuming buttonText is declared elsewhere
	                },
	                fail(err) {
	                    console.error('请求失败:', err);
	                },
	            });
	        },
	        fail: (err: any) => {
	            console.error('扫码失败:', err);
	        }
	    });
	};



	// 地点校验
	const validateLocation = () =>{
		if (!cityStr.value) {
			return false
		} else{
			return true
		}
	}

	//任务编号校验
	const  validateTaskCode = () =>{
	      const yearPattern = /^\d{4}$/; // 4位数字
	      const numberPattern = /^\d{3}$/; // 3位数字

	      if (!taskCodeParts.value.year || !taskCodeParts.value.number) {
	        return false
	      } else if (!yearPattern.test(taskCodeParts.value.year)) {
	        return false
	      } else if (!numberPattern.test(taskCodeParts.value.number)) {
	        return false
	      } else {
	        return true
	      }
	    }

	// 清空对象
	const initialObject = (obj: any) => {
	  Object.keys(obj).forEach(key => {
	    obj[key] = ''; // 重置为初始值，根据需要也可以重置为 null 或其他
	  });
	};

	// 清空时间和地点选择器绑定变量
	const initialLocNDate = () =>{
		dateSAva.value = ''
		dateStr.value = ''
		citydata.value = []
		cityStr.value = ''
	}
	
	// 提交表单
	const confirm = async (validateResult: validateResultType) => {
		console.log("confirm!")
		console.log(validateResult)
		if(validateResult.isPass){
			console.log(validateResult.data)
			await saveorUpdate()
			showModel.value = false
		} else {
			console.log("请完善表单相关信息！")
			uni.showToast({
				icon:'none',
				title: '请完善表单相关信息！',
				duration: 2000
			});
		}
	}

	// 提交验证后的表单数据
	const saveorUpdate = async() =>{
		//任务编号拼接
		sysEquipUse.value.taskCode = taskCodeConcat(taskCodeParts.value)
		console.log("form submit!")
		// 时间赋值
		sysEquipUse.value.equipmentUseDate = dateStr.value
		// 地点赋值
		sysEquipUse.value.location = cityFormat(cityStr.value)

		if(!sysEquipUse.value.id){
			console.log("add processing!")
			console.log(sysEquipUse.value)
			const res = await saveEquipUtilise(sysEquipUse.value).then(() =>{
				uni.showToast({
					title: '操作成功!',
					duration: 2000
				});
				console.log("操作成功!")
			})
		} else {
			console.log("edit processing!")
			console.log(sysEquipUse.value)
			const res = await update(sysEquipUse.value).then(() =>{
				uni.showToast({
					title: '操作成功!',
					duration: 2000
				});
				console.log("操作成功!")
			})
			console.log(res)
		}
		fetchData()
	}
	
	// 添加按钮
	const add = () =>{
		showModel.value = true
		// initialObject(sysEquipUse.value)
		sysEquipUse.value = ({})
		// 将用户编号设为当前用户的用户编号
		sysEquipUse.value.employeeUseCode = mainStore.username

		initialObject(taskCodeParts.value)
		console.log("add!")

		// 打开扫码按钮
		needScan.value = false;
		//console.log(needScan.value)
		console.log(sysEquipUse.value)

		initialLocNDate()
		citydata.value = ["陕西省","西安市"]
		dateStr.value = setToday()

		console.log(dateStr.value)
	}
	
	// 修改按钮
	const buttonEdit = async (item: sysEquipUseType,index: number) =>{
		showModel.value = true
		//数据回显
		//(item.id!)表示非空断言
		sysEquipUse.value = await getEquipUtiliseById(item.id!)

		initialObject(taskCodeParts.value)
		taskCodeParts.value = taskCodeSplit(sysEquipUse.value.taskCode!)

		//dateSar.value = "20120201"
		// 修改表单有设备编号回显，不需要扫码功能
		needScan.value = true

		dateStr.value = sysEquipUse.value.equipmentUseDate!
		cityStr.value = sysEquipUse.value.location!

		// console.log("dateStr:"+dateStr.value)
		// console.log("cityStr:"+cityStr.value)
		// console.log(sysEquipUse.value.equipmentUseDate)
		// console.log(sysEquipUse.value)
		// console.log(JSON.parse(JSON.stringify(sysEquipUse.value))); // 打印对象的深拷贝
		// console.log(taskCodeParts.value)
		// console.log("edit!")
	}
	
	// 删除按钮
	const removeById = async (item: sysEquipUseType,index: number) =>{
		console.log("delete!")
		console.log(item.id)
		uni.showModal({
			title: '提示',
			content: '此操作将永久删除该记录, 是否继续?',
			success: async function (res) {
				if (res.confirm) {
					const response = await removeId(item.id!)
					console.log('用户点击确定')
					console.log("response: "+response)
					uni.showToast({
						title: '操作成功!',
						duration: 2000
					});
					fetchData()
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		});
	}
	
	// 查看详情
	const detail = async (item: sysEquipUseType,index: number) =>{
		showModelDetail.value = true
		
		//显示当前记录的数据
		sysEquipUse.value = item
		taskCodeParts.value = taskCodeSplit(sysEquipUse.value.taskCode!)
		dateStr.value = sysEquipUse.value.equipmentUseDate!
		cityStr.value = sysEquipUse.value.location!
		console.log("detail!")
	}
	
	// 重置查询
	const resetData = async () =>{
		initialObject(searchObj.value)
		fetchData()
	}
	
	//条件分页排序查询
	const fetchData = async (pageNum: number = 1) =>{
		// 双问号，若前值为null或undefined，则赋予后值
		pagination.value.page = pageNum;
		// 调用api
		const res = await getPageList(
			pagination.value.page,
			pagination.value.limit,
			searchObj.value,
			sortOption.value.column,
			sortOption.value.sortorder
		)
		list.value = res.records
		// 这个total是总记录数不是总页数
		pagination.value.total = res.total
		console.log(res)
		console.log(list.value)
		// console.log(pagination.value.total)
	}
	
	// 在组件实例创建时立即调用,获取数据
	// 初始化时，以当前用户编号作为查询条件
	searchObj.value.keyword = mainStore.username
	fetchData();


</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: auto;
}
</style>