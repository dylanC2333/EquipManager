<template>
    <view class="bottom-btn">
        <tm-button block @click="fetchAll()">获取所有记录1</tm-button>
    </view>
	<view class="bottom-btn">
	    <tm-button block @click="fetchData()">获取记录2</tm-button>
		<tm-button block @click="add" size="mini">添加 </tm-button>
	</view>
	
	<view class="recordTable" style="height: 500px">
		<zb-table
		            :show-header="true"
		            :columns="column"
		            :stripe="true"
		            :fit="false"
		            :show-summary="false"
		            :border="true"
		            @edit="buttonEdit"
		            @remove="removeById"
					@detail="detail"
		            :data="list">
		</zb-table>
	</view>
	
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
			:width="700"
			:height="1000"
			v-model:show="showModel"
			:zIndex = "zindexNum"
			@ok="SaveorUpdate"
		>
			<tm-form ref="form" :label-width="80" >
				<tm-form-item required label="设备编号" field="equipmentCode" :rules="[{ required: true, message: '必填' }]" >
					<!-- 不要问我为什么用v-model.lazy，我很受伤。 -->
					<!-- <tm-text :font-size ="35" label="任务编号"></tm-text> -->
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentCode" :transprent="true" :showBottomBotder="false"> </tm-input>
				</tm-form-item>
				<tm-form-item required label="任务编号" field="taskCode" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.taskCode" :transprent="true" :showBottomBotder="false"> </tm-input>
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
				<!-- <tm-form-item required label="使用日期" field="equipmentUseDate" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.equipmentUseDate" :transprent="true" :showBottomBotder="false"> </tm-input>
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
				<tm-form-item required label="维护保养情况" field="maintenanceStatus" :rules="[{ required: true, message: '必填' }]" >
					<tm-input :inputPadding="[0, 0]" v-model.lazy="sysEquipUse.maintenanceStatus" :transprent="true" :showBottomBotder="false"> </tm-input>
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
		removeId
	} from '@/api/system/equipmentUtilise'
	import { ref , reactive ,computed, getCurrentInstance } from 'vue'
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
	
	//定义响应式变量
	// 日期选择器
	const dateSar = ref('') 
	const showdate = ref(false)
	const today = new Date()  
	const year = today.getFullYear() 
	const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始  
	const day = String(today.getDate()).padStart(2, '0') 
	const formattedDate = `${year}/${month}/${day}`
	const dateSAva = ref(formattedDate)
	
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
	const sysEquipUse = ref({
		equipmentCode :'',
		taskCode :'',
		employeeUseCode :'',
		equipmentUseDate :'',
		location :'',
		preUseEquipmentStatus :'',
		maintenanceStatus :'',
		remarks :'',	
	})
	const showCal = ref(false)// 日历显示控制
	const DayJs = dayjs.default// 日历组件
	
	const column = reactive([
	          { type:'selection', fixed:true, align:'right', width:40 },
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
	// const data = ref([
	//           {
	//             date: '2016-05-02',
	//             name: '王小虎1',
	//             province: '上海',
	//             sex:'男',
	//             age:'18',
	//             img:"https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
	//             city: '普陀区',
	//             address: '上海市普',
	//             zip: 200333
	//           },
 //    ])
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
	
	// 处理时间选择器确认后把表单重新显示回来
	// const handleTimePickerConfirm = (selectedTime: string) => {
	// 	// 为空就是 选择的是当天，还没有动轮盘
	// 	if(selectedTime != ''){
	// 		dateSAva.value = formatDate(selectedTime);
	// 		console.log(typeof selectedTime)
	// 	}
	// 	console.log(selectedTime)
	// 	console.log(dateSAva.value)
	// 	zindexNum.value = 999
	// 	showdate.value = false
	// };
	
	// 点击地点选择器让form不显示，让
	const handleCityPicker = () => {
		// 让form层级变小，让选择器显示
		zindexNum.value = 10
		showCitydate.value = true
		
	};
	
	// // 处理地点选择器确认后把表单重新显示回来
	// const handleCityPickerConfirm = (selectedCity: Array<string>) => {
	// 	console.log(selectedCity)
	// 	//citydate.value = selectedCity
	// 	console.log(citydate)
	// 	zindexNum.value = 999
	// 	showCitydate.value = false
	// 	console.log(cityStr.value)
	// };
	
	// 日历渲染
	const caleStr = computed(() => {
		if (!sysEquipUse.value.equipmentUseDate || !Array.isArray(sysEquipUse.value.equipmentUseDate)) return ''
		if (sysEquipUse.value.equipmentUseDate.length == 0) return ''
		return DayJs(sysEquipUse.value.equipmentUseDate[0]).format('YYYY-MM-DD')
	})
	
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
	const SaveorUpdate = async() =>{
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
		}
	}
	
	// 添加按钮
	const add = async() =>{
		showModel.value = true
		initialObject(sysEquipUse.value)
		console.log("add!")
		// 清空时间和地点选择器绑定变量
		dateSAva.value = ''
		dateSar.value = ''
		citydate.value = []
		cityStr.value = ''
	} 
	
	// 修改按钮
	const buttonEdit = async (item: object,index: number) =>{
		showModel.value = true
		sysEquipUse.value = item
		console.log(sysEquipUse.value)
		console.log("edit!")
	}
	
	// 删除按钮
	const removeById = async (item: object,index: number) =>{
		console.log("delete!")
		console.log(item.id)
		const res = await removeId(item.id)
		console.log("res: "+res)
		fetchData()
	}
	
	// 查看详情
	const detail = async () =>{
		console.log("detail!")
	}
	
	// 获取所有数据
	const fetchAll = async () =>{
		// console.log("getAllRecords")
		const list = await findAllRecords()
		console.log(list)
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
		console.log(pagination.value.page)
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