<template>
	<tm-text :font-size="48" _class="text-weight-b" label="设备保养列表"></tm-text>
	<tm-sheet>
		<tm-text :font-size="30" _class="text-weight-b" label="请输入搜索关键字"></tm-text>
		<tm-input v-model="searchObj.keyword" placeholder="设备编号/员工编号"></tm-input>
		<view class="flex flex-row flex-wrap">
			<tm-button  :margin="[10]" @click="fetchData()" size="normal">搜索</tm-button>
			<tm-button  :margin="[10]" @click="resetData()" size="normal"  outlined >重置</tm-button>
		</view>
		<tm-button  :margin="[10]" @click="add" size="normal">添加 </tm-button>
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
			<tm-form ref="form" :label-width="80" @submit="confirm" v-model="sysEquipMain">
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<!-- 不要问我为什么用v-model.lazy，我很受伤。不用.lazy在小程序可能会出现字符闪烁或者输入过快时，字符丢失的问题。 -->
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipMain.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					<tm-button @click="scanCode" :margin="[10]" :shadow="0" text size="small" outlined label="扫码获取" :disabled="needScan"></tm-button>
				</tm-form-item>
				<tm-form-item required label="保养人编号" field="employeeCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :disabled="true" :inputPadding="[0, 0]" v-model.lazy="sysEquipMain.employeeCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="保养日期" field="maintenanceDate" :rules="[{ required: true, message: '必填' , validator: validateDate}]" >
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
				<tm-form-item required label="设备使用前状态" field="beforeUseStatus" :rules="[{ required: true, message: '必填' }]" >
					<!-- <tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipMain.preUseEquipmentStatus" :transprent="true" :showBottomBotder="false"> </tm-input> -->
					<tm-radio-group v-model="sysEquipMain.beforeUseStatus">
						<tm-radio label="正常" value="正常"></tm-radio>
						<tm-radio label="异常" value="异常"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item label="设备维护保养状态" field="maintenanceStatus" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipMain.maintenanceStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item label="备注" field="remarks" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipMain.remarks" :transprent="true" :showBottomBotder="false"> </tm-input>
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
			

	
</template>

<script setup lang="ts">
	//使用<script setup>，组合式 API 单文件组件，语法糖。所有顶层绑定均能在模板中直接使用。
	import {
		getPageList,
		saveEquipMain,
		removeId,
		update,
		getEquipMainById
	} from '@/api/system/equipmentMaintain'
	import { ref , reactive } from 'vue'
	import { useMainStore } from '@/store'

	// import tmPagination from '@/tmui/components/tm-pagination/tm-pagination.vue'
	// import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
	// import { onShow, onLoad } from '@dcloudio/uni-app'
	// import tmApp from '@/tmui/components/tm-app/tm-app.vue'
	// import tmText from '@/tmui/components/tm-text/tm-text.vue'
	// import tmCell from '@/tmui/components/tm-cell/tm-cell.vue'
	// import tmTimePicker from '@/tmui/components/tm-time-picker/tm-time-picker.vue'
	// import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
	// import tmTimeView from '@/tmui/components/tm-time-view/tm-time-view.vue'
	// import tmCityCascader from '@/tmui/components/tm-city-cascader/tm-city-cascader.vue'
	// import tmCityPicker from '@/tmui/components/tm-city-picker/tm-city-picker.vue'
	// import { List } from 'echarts'
	import * as cheerio from 'cheerio'
	
	
	//定义数据模型，用于ts类型检查
	interface sysEquipMainType {
	  id?: number;
	  createTime?: string;
	  updateTime?: string;
	  isDeleted?: number;
	  employeeCode?: string;
	  employeeName?: string | null;
	  equipmentCode?: string;
	  equipmentName?: string | null;
	  maintenanceDate?: string;
	  beforeUseStatus?: string;
	  maintenanceStatus?: string;
	  remarks?: string;
	}
	interface validateResultType{
		data: sysEquipMainType
		// 所有与form-item绑定的filed字段校验的结果数组。
		result:{
			message:string,//校验后的提示文本
			validator: boolean,//是否校验通过
		}[],
		isPass:boolean //是否校验通过
	}

	//定义响应式变量

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
	const sysEquipMain = ref<sysEquipMainType>({
		employeeCode :'',
		equipmentCode :'',
		maintenanceDate :'',
		beforeUseStatus :'',
		maintenanceStatus :'',
		remarks :'',
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
	          { name: 'equipmentName', label: '设备名称',sorter:false,emptyString:''},
	          { name: 'maintenanceDate', label: '保养日期' },
	          { name: 'employeeCode', label: '保养人编号' },
	          { name: 'employeeName', label: '保养人姓名',sorter:true },
	          { name: 'beforeUseStatus', label: '设备使用前状态' },
	          { name: 'maintenanceStatus', label: '设备维护保养状态' },
			  { name: 'remarks', label: '备注'},
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

	// 定义页码改变处理函数
	const handlePageChange = (newPage : number) => {
		console.log(newPage);
		pagination.value.page = newPage; // 更新当前页码
		fetchData(newPage); // 使用最新的页码调用 fetchData
	};

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
	                    sysEquipMain.value.equipmentCode = deviceNumber;
	                    // 输出设备编号
	                    console.log(sysEquipMain.value.equipmentCode);
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

	// 清空对象
	const initialObject = (obj: any) => {
	  Object.keys(obj).forEach(key => {
	    obj[key] = ''; // 重置为初始值，根据需要也可以重置为 null 或其他
	  });
	};

	// 清空时间选择器绑定变量
	const initialDate = () =>{
		dateSAva.value = ''
		dateStr.value = ''
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
		console.log("form submit!")
		// 时间赋值
		sysEquipMain.value.maintenanceDate = dateStr.value

		if(!sysEquipMain.value.id){
			console.log("add processing!")
			console.log(sysEquipMain.value)
			const res = await saveEquipMain(sysEquipMain.value).then(() =>{
				uni.showToast({
					title: '操作成功!',
					duration: 2000
				});
				console.log("操作成功!")
			})
		} else {
			console.log("edit processing!")
			console.log(sysEquipMain.value)
			const res = await update(sysEquipMain.value).then(() =>{
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
		// initialObject(sysEquipMain.value)
		sysEquipMain.value = ({})
		// 将用户编号设为当前用户的用户编号
		sysEquipMain.value.employeeCode = mainStore.username
		
		console.log("add!")

		// 打开扫码按钮
		needScan.value = false;
		//console.log(needScan.value)
		console.log(sysEquipMain.value)

		initialDate()
		dateStr.value = setToday()

		console.log(dateStr.value)
	}
	
	// 修改按钮
	const buttonEdit = async (item: sysEquipMainType,index: number) =>{
		showModel.value = true
		//数据回显
		//(item.id!)表示非空断言
		sysEquipMain.value = await getEquipMainById(item.id!)

		//dateSar.value = "20120201"
		// 修改表单有设备编号回显，不需要扫码功能
		needScan.value = true

		dateStr.value = sysEquipMain.value.maintenanceDate!

		// console.log("dateStr:"+dateStr.value)
		// console.log("cityStr:"+cityStr.value)
		// console.log(sysEquipMain.value.equipmentUseDate)
		// console.log(sysEquipMain.value)
		// console.log(JSON.parse(JSON.stringify(sysEquipMain.value))); // 打印对象的深拷贝
		// console.log(taskCodeParts.value)
		// console.log("edit!")
	}
	
	// 删除按钮
	const removeById = async (item: sysEquipMainType,index: number) =>{
		console.log("delete!")
		console.log(item.id)
		const res = await removeId(item.id!)
		console.log("res: "+res)
		fetchData()
	}
	
	// 查看详情
	const detail = async () =>{
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