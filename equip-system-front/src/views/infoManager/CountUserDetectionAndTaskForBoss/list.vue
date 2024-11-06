<template>
    <div class="app-container">
      员工在一段时间经历的任务数和打卡天数
      <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关 键 字">
                <el-input
                  style="width: 95%"
                  v-model="searchObj.keyword"
                  placeholder="员工工号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16"> <!-- 新增的列 -->  
                <div class="block">  
                <!-- <span class="demonstration">带快捷选项</span>   -->
                <el-date-picker  
                    v-model="value2"  
                    type="daterange" 
                    size = "small"
                    align="right" 
                    value-format="yyyy-MM-dd"
                    unlink-panels  
                    range-separator="至"  
                    start-placeholder="开始日期"  
                    end-placeholder="结束日期"  
                    :picker-options="pickerOptions">  
                </el-date-picker>  
                </div>  
            </el-col> 
          </el-row>
          <el-row style="display: flex" :gutter="20">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="search()"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetData"
              >重置</el-button
            >
            <el-button type="primary" icon="el-icon-download" size="mini" @click="exportCurrent"
              >导出当前表格为Excel</el-button
            >
          </el-row>
        </el-form>
      </div>

      

      <!-- 参与任务的员工信息 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="employeeName" label="检测人姓名" />
        <el-table-column prop="employeeCode" label="检测人编号" />
        <el-table-column prop="taskNum" label="任务数" />
        <el-table-column prop="detectionNum" label="打卡天数" />
      </el-table>

      <!-- 分页组件 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="fetchData"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"/>

      
    </div>
  </template>
  <script>
  import api from "@/api/system/equipDetection";
  import * as XLSX from 'xlsx';
  export default {
    data() {
      return {
        listLoading: false, // 数据是否正在加载
        list: null, // banner列表
        //list_eq: null,
        total: 0, // 数据库中的总记录数
        //total_eq: 0,
        page: 1, // 默认页码
        limit: 10, // 每页记录数
        searchObj: {}, // 查询表单对象
        dialogVisible: false,
        sysTaskDevice: {},
        // 下面是日期选择组件使用的变量
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value2:'',
        //下面是统计的变量
        //isVisible:false,
        //taskNum:0,
        
      };
    },
    created() {
      this.fetchData();
    },
    methods: {

      //导出当前表格为Excel
      exportCurrent(){
        console.log("Export to Excel!");
        this.limit = -1;
        api.UserDetectionCountForBoss(this.page, this.limit, this.searchObj)
          .then((response) => {
            this.list = response.data.records;
            this.total = response.data.total;
            console.log(this.list);
            const FilteredData = this.list.map(item => ({
              检测人姓名: item.employeeName,    // 修改字段名称
              检测人编号: item.employeeCode, // 修改字段名称
              任务数: item.taskNum,
              打卡天数: item.detectionNum,
            }));
            // 将数据转换为工作表
            const worksheet = XLSX.utils.json_to_sheet(FilteredData,{header:['检测人姓名','检测人编号','任务数','打卡天数']});
            
            // 创建工作簿并添加工作表
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '检测人员出勤表');
            
            // 导出Excel文件
            XLSX.writeFile(workbook, 'data.xlsx');
          })          
          .finally(() =>{
            this.limit = 10;
            this.fetchData();
          });
      },

      // 查询触发函数
      search(){
        // 获取数据
        this.fetchData();
      },  
      // 重置查询表单
      resetData() {
        console.log("重置查询表单");
        this.searchObj = {};
        this.value2 = '';
        //this.isVisible = false;
        this.fetchData();
      },

      // 每页显示记录数改变
      handleSizeChange(currentLimit){
        this.limit = currentLimit;
        this.fetchData();
        //console.log(this.limit);
      },

      
      //列表
      fetchData(page = 1) {
        this.page = page;
        console.log(this.value2);
        if(this.value2 != ''){
            var start = this.value2[0];
            var end  = this.value2[1];
            this.searchObj.start = start;
            this.searchObj.end = end;
        }
        
        api.UserDetectionCountForBoss(this.page, this.limit, this.searchObj)
          .then((response) => {
            console.log(response);
            this.list = response.data.records;
            this.total = response.data.total;
          });
      },
    },
  };
  </script>
<style lang="scss">
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>