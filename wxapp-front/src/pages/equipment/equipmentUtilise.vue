<template>
	<tm-text :font-size="48" _class="text-weight-b" label="设备使用列表"></tm-text>
	<tm-sheet>
		<tm-text :font-size="30" _class="text-weight-b" label="请输入搜索关键字"></tm-text>
		<tm-input v-model="searchObj.keyword" placeholder="设备编号/操作人编号/任务编号"></tm-input>
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
			hideCancel=true
			:width="700"
			:height="1200"
			v-model:show="showModel"
			:zIndex = "zindexNum"
			okText="返回"
		>
			<tm-form ref="form" :label-width="80" @submit="confirm" v-model="sysEquipUse">
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<!-- 不要问我为什么用v-model.lazy，我很受伤。 -->
					<!-- <tm-text :font-size ="35" label="设备编号"></tm-text> -->
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '请正确填写任务编号格式', validator: validateTaskCode}]" >
					<tm-input :inputPadding="[0, 0]"  v-model.lazy="taskCodeParts.year" :transprent="true" prefixLabel='RW-' placeholder="请输入年份"> </tm-input>
					<tm-input :inputPadding="[49, 0]" v-model.lazy="taskCodeParts.number" :transprent="true" prefixLabel='-' placeholder="请输入序号"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="使用人编号" field="employeeUseCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.employeeUseCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
<!-- 				<tm-form-item required label="使用日期" field="cale" :rules="[{ required: true, message: '请选择日期哦' }]">
					<view @click="showCal = !showCal" class="flex flex-row flex-row-center-between">
						<tm-text :userInteractionEnabled="false" :label="caleStr || '请选择有效日期'"></tm-text>
						<tm-icon :userInteractionEnabled="false" :font-size="24" name="tmicon-angle-right"></tm-icon>
					</view>
				</tm-form-item> -->
				<tm-form-item required label="使用日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' }]" >
					<tm-cell @click="handleTimePicker"  :right-text="dateSar || '请选择日期'"></tm-cell>
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
								v-model:model-str="dateSar"
							></tm-time-picker>
				</tm-form-item>
				<tm-form-item required label="地点" field="location" :rules="[{ required: true, message: '必填' }]" >
					<!-- <tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.location" :transprent="true" :showBottomBotder="false"> </tm-input>
				 -->
					<tm-cell @click="handleCityPicker"  :right-text="cityStr || '请选择地点'"></tm-cell>
					<tm-city-picker selectedModel="name" v-model="citydate" v-model:show="showCitydate" v-model:model-str="cityStr" cityLevel="city" ></tm-city-picker>
				 </tm-form-item>
				<tm-form-item required label="设备使用前情况" field="preUseEquipmentStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.preUseEquipmentStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item label="维护保养情况" field="maintenanceStatus" :rules="[{}]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.maintenanceStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item :border="false">
					<view class="flex flex-row">
						<view class="flex-1 mr-32">
							<tm-button form-type="submit" label="提交表单" block></tm-button>
						</view>
						<view class="flex-1">
							<tm-button :shadow="0" text form-type="reset" label="重置表单" block></tm-button>
						</view>
					</view>
				</tm-form-item>
			</tm-form>		
		</tm-modal>
		
		<tm-calendar v-model="sysEquipUse.equipmentUseDate" v-model:show="showCal" :default-value="sysEquipUse.equipmentUseDate"></tm-calendar>
		
	</tm-app>
			

	
</template>

<script setup lang="ts">
	//使用<script setup>，组合式 API 单文件组件，语法糖。所有顶层绑定均能在模板中直接使用。
	import {
		findAllRecords,
		getPageList,
		saveEquipUtilise,
		removeId,
		update,
		getEquipUtiliseById
	} from '@/api/system/equipmentUtilise'
	import { ref , reactive ,computed, getCurrentInstance } from 'vue'
	import { taskCodeSplit,taskCodeConcat } from '@/utils/taskCodeFormat'
	import { ref , reactive ,computed } from 'vue'
	import * as dayjs from '@/tmui/tool/dayjs/esm/index'
	import tmPagination from '@/tmui/components/tm-pagination/tm-pagination.vue'
	import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
	import { onShow, onLoad } from '@dcloudio/uni-app'
	import tmApp from '@/tmui/components/tm-app/tm-app.vue'
	import tmText from '@/tmui/components/tm-text/tm-text.vue'
	import tmCell from '@/tmui/components/tm-cell/tm-cell.vue'
	import tmTimePicker from '@/tmui/components/tm-time-picker/tm-time-picker.vue'
	import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
	import tmTimeView from '@/tmui/components/tm-time-view/tm-time-view.vue'
	import tmCityCascader from '@/tmui/components/tm-city-cascader/tm-city-cascader.vue'
	import tmCityPicker from '@/tmui/components/tm-city-picker/tm-city-picker.vue'
	import { List } from 'echarts'

	// 地点选择器变量
	const cityStr = ref('')
	const citydate = ref([])
	const showCitydate = ref(false)

	//定义数据模型，用于ts类型检查
	interface sysEquipUseType {
	  id?: number;
	  createTime?: string;
	  updateTime?: string;
	  employeeUseCode?: string;
	  employeeUseName?: string | null;
	  equipmentCode?: string;
	  equipmentUseDate?: string;
	  equipmentUseName?: string | null;
	  isAdditional?: number;
	  isDeleted?: number;
	  location?: string;
	  maintenanceStatus?: string;
	  preUseEquipmentStatus?: string;
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
	// 日期选择器
	const dateSar = ref('')
	const showdate = ref(false)
	//const today = new Date()
	//const year = today.getFullYear()
	//const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始
	//const day = String(today.getDate()).padStart(2, '0')
	//const formattedDate = `${year}/${month}/${day}`
	const dateSAva = ref('')

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
	const sysEquipUse = ref<sysEquipUseType>({
		equipmentCode :'',
		taskCode :'',
		employeeUseCode :'',
		equipmentUseDate :'',
		location :'',
		preUseEquipmentStatus :'',
		maintenanceStatus :'',
	})
	const taskCodeParts = ref<{
		year: string,
		number: string
	}>({// 任务编号组件
		year: '',
		number: ''
	})
	const showCal = ref(false)// 日历显示控制
	const DayJs = dayjs.default// 日历组件
	
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
	          { name: 'preUseEquipmentStatus', label: '设备使用前情况' },
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

	// 点击时间选择器让form不显示，让
	const handleTimePicker = () => {
		// 让form层级变小，让选择器显示
		zindexNum.value = 10
		showdate.value = true
		console.log(citydate.value)
	};

	// 取消时让选择器不显示，把表单的层级写回来
	const handleTimePickerCancel = () =>{
		zindexNum.value = 999
		showdate.value = false
		console.log(dateSAva.value)
		console.log(dateSar.value)
	};


	// 点击地点选择器让form不显示，让
	const handleCityPicker = () => {
		// 让form层级变小，让选择器显示
		zindexNum.value = 10
		showCitydate.value = true

	};


	// 日历渲染
	const caleStr = computed(() => {
		if (!sysEquipUse.value.equipmentUseDate || !Array.isArray(sysEquipUse.value.equipmentUseDate)) return ''
		if (sysEquipUse.value.equipmentUseDate.length == 0) return ''
		return DayJs(sysEquipUse.value.equipmentUseDate[0]).format('YYYY-MM-DD')
	})
	
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
	        return true;
	      }
	    }

	// 清空对象
	const initialObject = (obj: any) => {
	  Object.keys(obj).forEach(key => {
	    obj[key] = ''; // 重置为初始值，根据需要也可以重置为 null 或其他
	  });

	  // 清空时间选择器
	  dateSAva.value = ''
	  dateSar.value = ''

	  // 清空地点选择器
	  cityStr.value=''
	  //console.log(cityStr.value)
	  citydate.value = []
	};
	
	// 提交表单
	const confirm = async (validateResult: validateResultType) => {
		console.log("confirm!")
		console.log(validateResult)
		if(validateResult.isPass){
			console.log(validateResult.data)
			await saveorUpdate()
			showModel.value = false
		}
	}

	// 提交验证后的表单数据
	const saveorUpdate = async() =>{
		//任务编号拼接
		sysEquipUse.value.taskCode = taskCodeConcat(taskCodeParts.value)
		console.log("form submit!")
		// 时间赋值
		sysEquipUse.value.equipmentUseDate = dateSar.value

		// 地点赋值
		sysEquipUse.value.location = cityStr.value

		if(!sysEquipUse.value.id){
			console.log("add processing!")
			console.log(sysEquipUse.value)
			const res = await saveEquipUtilise(sysEquipUse.value)
			console.log(res)
		} else {
			console.log("edit processing!")
			console.log(sysEquipUse.value)
			const res = await update(sysEquipUse.value)
			console.log(res)
		}
		fetchData()
	}
	
	// 添加按钮
	const add = async() =>{
		showModel.value = true
		initialObject(sysEquipUse.value)
		initialObject(taskCodeParts.value)
		console.log("add!")
		// 清空时间和地点选择器绑定变量
		dateSAva.value = ''
		dateSar.value = ''
		citydate.value = []
		cityStr.value = ''
	}
	
	// 修改按钮
	const buttonEdit = async (item: sysEquipUseType,index: number) =>{
		showModel.value = true
		sysEquipUse.value = await getEquipUtiliseById(item.id!)
		//(item.id!)表示非空断言
		initialObject(taskCodeParts.value)
		taskCodeParts.value = taskCodeSplit(sysEquipUse.value.taskCode!)
		console.log(sysEquipUse.value)
		console.log(taskCodeParts.value)
		console.log("edit!")
	}
	
	// 删除按钮
	const removeById = async (item: sysEquipUseType,index: number) =>{
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
	
	// 定义事件处理函数
	const handlePageChange = (newPage : number) => {
		console.log(newPage);
		pagination.value.page = newPage; // 更新当前页码
		fetchData(newPage); // 使用最新的页码调用 fetchData
	};

// 	function formatDate(dateString: string): string {
// 		// 按空格分割
// 		const datePart = dateString.split(' ')[0]; // 获取日期部分
// 		// 将日期部分按斜杠分割
// 		const [year, month, day] = datePart.split('/');
// 		// 重新组合为 "YYYY-MM-DD" 格式
// 		return `${year}-${month}-${day}`;
// }


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