<template>
	<tm-text :font-size="48" _class="text-weight-b" label="设备出入库列表"></tm-text>
	<tm-sheet>
		<tm-text :font-size="30" _class="text-weight-b" label="请输入搜索关键字"></tm-text>
		<tm-input v-model="searchObj.keyword" placeholder="设备编号/任务编号/出入库日期/员工编号"></tm-input>
		<view class="flex flex-row flex-wrap">
			<tm-button :font-size="35" :margin="[10]" @click="fetchData()" size="normal">搜索</tm-button>
			<tm-button :font-size="35" :margin="[10]" @click="resetData()" size="normal"  outlined >重置</tm-button>
		</view>
		<tm-button  color="green" :font-size="35" :margin="[10]" @click="add" size="normal">添加 </tm-button>
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
			<tm-form ref="form" :label-width="80" @submit="confirm" v-model="sysEquipStock">
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<!-- 不要问我为什么用v-model.lazy，我很受伤。不用.lazy在小程序可能会出现字符闪烁或者输入过快时，字符丢失的问题。 -->
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					<tm-button @click="scanCode" :margin="[10]" :shadow="0" text size="small" outlined label="扫码获取" :disabled="needScan"></tm-button>
				</tm-form-item>
				<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '请正确填写任务编号', validator: validateTaskCode}]" >
					<tm-input :inputPadding="[0, 0]"  v-model.lazy="taskCodeParts.year" :transprent="true" prefixLabel='RW-' placeholder="请输入年份"> </tm-input>
					<tm-input :inputPadding="[49, 0]" v-model.lazy="taskCodeParts.number" :transprent="true" prefixLabel='-' placeholder="请输入序号"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="出入库人编号" field="userCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :disabled="true" :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.userCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="出入库日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' , validator: validateDate}]" >
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
				<tm-form-item required label="仓库管理员编号" field="warehouseManagerCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.warehouseManagerCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="出入库类型" field="type" :rules="[{ required: true, message: '必填' }]" >
					<tm-radio-group v-model="sysEquipStock.type">
						<tm-radio label="出库" value="出库"></tm-radio>
						<tm-radio label="入库" value="入库"></tm-radio>
					</tm-radio-group>
				</tm-form-item>
				<tm-form-item label="备注" field="remarks" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.remarks" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item v-if = "!sysEquipStock.id":border="false">
					<view class="flex flex-row">
						<view class="flex-1 mr-32">
							<tm-button form-type="submit" label="提交并继续添加" block></tm-button>
						</view>
					</view>
				</tm-form-item>
				<tm-form-item v-if = "sysEquipStock.id":border="false">
					<view class="flex flex-row">
						<view class="flex-1 mr-32">
							<tm-button form-type="submit" label="提交表单" block></tm-button>
						</view>
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
				<tm-form ref="form" :label-width="80" v-model="sysEquipStock">
					<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="设备名称" field="equipmentName" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.equipmentName" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '请正确填写任务编号', validator: validateTaskCode}]" >
						<tm-input disabled :inputPadding="[0, 0]"  v-model.lazy="taskCodeParts.year" :transprent="true" prefixLabel='RW-' placeholder="请输入年份"> </tm-input>
						<tm-input disabled :inputPadding="[49, 0]" v-model.lazy="taskCodeParts.number" :transprent="true" prefixLabel='-' placeholder="请输入序号"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="出入库人编号" field="userCode" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.userCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="出入库人姓名" field="userName" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.userName" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="出入库日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' , validator: validateDate}]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="dateStr" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="仓库管理员编号" field="warehouseManagerCode" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.warehouseManagerCode" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="仓库管理员姓名" field="warehouseManagerName" :rules="[{ required: true, message: '必填' }]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.warehouseManagerName" :transprent="true" :showBottomBotder="false"> </tm-input>
					</tm-form-item>
					<tm-form-item required label="出入库类型" field="type" :rules="[{ required: true, message: '必填' }]" >
						<tm-radio-group v-model="sysEquipStock.type">
							<tm-radio disabled label="出库" value="出库"></tm-radio>
							<tm-radio disabled label="入库" value="入库"></tm-radio>
						</tm-radio-group>
					</tm-form-item>
					<tm-form-item label="备注" field="remarks" :rules="[{}]" >
						<tm-input disabled :inputPadding="[0, 0]" v-model.lazy="sysEquipStock.remarks" :transprent="true" :showBottomBotder="false" > </tm-input>
					</tm-form-item>
				</tm-form>		
			</tm-modal>
		</tm-app>
	
</template>

<script setup lang="ts">
	//使用<script setup>，组合式 API 单文件组件，语法糖。所有顶层绑定均能在模板中直接使用。
	import {
		getPageList,
		saveEquipStock,
		removeId,
		update,
		getEquipStockById
	} from '@/api/system/equipmentStock'
	import { ref , reactive } from 'vue'
	import { taskCodeSplit,taskCodeConcat } from '@/utils/taskCodeFormat'
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
	interface sysEquipStockType {
	  id?: number;
	  createTime?: string;
	  updateTime?: string;
	  isAdditional?: number;
	  isDeleted?: number;
	  taskCode?: string;
	  type?: string;
	  userCode?: string;
	  userName?: string | null;
	  warehouseManagerName?: string | null;
	  warehouseManagerCode?: string;
	  equipmentCode?: string;
	  equipmentName?: string | null;
	  equipmentDate?: string;
	  remarks?: string;
	}
	interface validateResultType{
		data: sysEquipStockType
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
	const showModelDetail = ref(false) //详情表单显示
	const sysEquipStock = ref<sysEquipStockType>({
		taskCode :'',
		equipmentCode :'',
		userCode :'',
		warehouseManagerCode :'',
		equipmentDate :'',
		type :'',
		remarks :'',
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
	          { name: 'equipmentName', label: '设备名称',sorter:false,emptyString:''},
	          { name: 'type', label: '出入库类型' },
	          { name: 'taskCode', label: '任务编号'},
	          { name: 'equipmentDate', label: '出入库日期' },
	          { name: 'userCode', label: '出入库人编号' },
	          { name: 'userName', label: '出入库人姓名',sorter:true },
	          { name: 'warehouseManagerCode', label: '仓库管理员编号' },
	          { name: 'warehouseManagerName', label: '仓库管理员姓名',sorter:true },
	          { name: 'remarks', label: '备注' },
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
	const scanCode = () => {
	  uni.scanCode({
	    success: (res: { scanType: string; result: string }) => {
	      console.log('条码类型：' + res.scanType);
	      console.log('条码内容：' + res.result);
	
	      try {
			  // 确保 URL 包含协议头（如 https://）
			  let url = res.result;
			  if (!url.startsWith('http://') && !url.startsWith('https://')) {
				url = 'https://' + url; // 假设默认使用 HTTPS
			  }
	  
			  // 手动解析域名和参数
			  const [protocolHost, ...rest] = url.split('/app/'); // 分割域名和路径
			  const baseUrl = protocolHost || ''; // 获取 https://jc.sxjkgcjs.com:9103
			  const queryIndex = url.indexOf('?');
			  const queryParams = queryIndex !== -1 ? url.slice(queryIndex + 1) : '';
			  const id = queryParams.split('id=')[1]?.split('&')[0]; // 提取 id
	  
			  if (!id) {
				uni.showToast({ title: 'URL中缺少ID参数', icon: 'none' });
				return;
			  }
	  
			  // 拼接新 API 地址（注意：POST 请求一般不需要在 URL 中带参数）
			  const apiUrl = `${baseUrl}/detectionserver/pmtapi/foundation_App/getInstrument?id=` + id;
			  console.log('新API地址:', apiUrl);
	
	        // 4. 发起请求
	        uni.request({
	          url: apiUrl,
			  method:'POST',// 指定为 POST 方法
			  data: {},
			  header: {
                'Content-Type': 'application/json', // 根据 API 要求调整（如 'application/x-www-form-urlencoded'）
				'Origin': 'https://jc.sxjkgcjs.com:9103',       // 强制声明来源
				'Referer': 'https://jc.sxjkgcjs.com:9103/app/Instrument/index.html?id=' + id,
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
			  },
	          success: (requestRes) => {
	            // 直接解析 JSON 数据
				console.log(requestRes);
	            const resData = requestRes.data as {
	              manage?: string;  // 声明字段类型（可选防止未定义报错）
	              [key: string]: any; // 其他字段不强制声明
	            };
	
	            // 检查必要字段
	            if (!resData?.manage) {
	              uni.showToast({ title: '数据中缺少设备编号', icon: 'none' });
	              return;
	            }
	
	            // 直接提取 manage 字段
	            sysEquipStock.value.equipmentCode = resData.manage;
	            console.log('设备编号:', sysEquipStock.value.equipmentCode);
	            
	          },
	          fail: (err) => {
	            console.error('请求失败:', err);
	            uni.showToast({ title: '请求失败', icon: 'none' });
	          }
	        });
	      } catch (error) {
	        console.error('URL解析失败:', error);
	        uni.showToast({ title: '无效的二维码链接', icon: 'none' });
	      }
	    },
	    fail: (err: any) => {
	      console.error('扫码失败:', err);
	      uni.showToast({ title: '扫码失败', icon: 'none' });
	    }
	  });
	};

	//任务编号校验
	const  validateTaskCode = () =>{
		// const yearPattern = /^\d{4}$/; // 4位数字
		// const numberPattern = /^\d{3}$/; // 3位数字

		if (!taskCodeParts.value.year || !taskCodeParts.value.number) {
		return false
		// } else if (!yearPattern.test(taskCodeParts.value.year)) {
		// return false
		// } else if (!numberPattern.test(taskCodeParts.value.number)) {
		// return false
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

	// 清空时间选择器绑定变量
	const initialLocNDate = () =>{
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
			// showModel.value = false
			// 继续添加，关闭弹窗放在saveorUpdate中
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
		sysEquipStock.value.taskCode = taskCodeConcat(taskCodeParts.value)
		console.log("form submit!")
		// 时间赋值
		sysEquipStock.value.equipmentDate = dateStr.value

		if(!sysEquipStock.value.id){
			console.log("add processing!")
			console.log(sysEquipStock.value)
			const res = await saveEquipStock(sysEquipStock.value)
			uni.showToast({
				title: '操作成功!',
				duration: 2000
			});
			console.log("操作成功!")
			sysEquipStock.value.equipmentCode = ''
		} else {
			console.log("edit processing!")
			console.log(sysEquipStock.value)
			const res = await update(sysEquipStock.value)
			uni.showToast({
				title: '操作成功!',
				duration: 2000
			});
			console.log("操作成功!")
			// 修改时提交完成关闭弹窗
			showModel.value = false
			console.log(res)
		}
		fetchData()
	}
	
	// 添加按钮
	const add = () =>{
		showModel.value = true
		// initialObject(sysEquipStock.value)
		sysEquipStock.value = ({})
		// 将用户编号设为当前用户的用户编号
		sysEquipStock.value.userCode = mainStore.username

		initialObject(taskCodeParts.value)
		console.log("add!")

		// 打开扫码按钮
		needScan.value = false;
		//console.log(needScan.value)
		console.log(sysEquipStock.value)

		initialLocNDate()
		dateStr.value = setToday()

		console.log(dateStr.value)
	}
	
	// 修改按钮
	const buttonEdit = async (item: sysEquipStockType,index: number) =>{
		showModel.value = true
		//数据回显
		//(item.id!)表示非空断言
		sysEquipStock.value = await getEquipStockById(item.id!)

		initialObject(taskCodeParts.value)
		taskCodeParts.value = taskCodeSplit(sysEquipStock.value.taskCode!)
		dateStr.value = sysEquipStock.value.equipmentDate!

		// 修改表单有设备编号回显，不需要扫码功能
		needScan.value = true

		// console.log("dateStr:"+dateStr.value)
		// console.log(sysEquipStock.value.equipmentDate)
		// console.log(sysEquipStock.value)
		// console.log(JSON.parse(JSON.stringify(sysEquipStock.value))); // 打印对象的深拷贝
		// console.log(taskCodeParts.value)
		// console.log("edit!")
	}
	
	// 删除按钮
	const removeById = async (item: sysEquipStockType,index: number) =>{
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
	const detail = async (item: sysEquipStockType,index: number) =>{
		showModelDetail.value = true
		
		//显示当前记录的数据
		sysEquipStock.value = item
		taskCodeParts.value = taskCodeSplit(sysEquipStock.value.taskCode!)
		dateStr.value = sysEquipStock.value.equipmentDate!

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