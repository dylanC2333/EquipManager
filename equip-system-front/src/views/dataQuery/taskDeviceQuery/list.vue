<template>
    <div class="app-container">
      任务参与人员与所使用设备查询列表
      <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关 键 字">
                <el-input
                  style="width: 95%"
                  v-model="searchObj.keyword"
                  placeholder="任务编号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display: flex">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="fetchData()"
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

        <el-table-column prop="userName" label="检测人姓名" />
        <el-table-column prop="employeeCode" label="检测人编号" />
        <el-table-column prop="taskCode" label="任务编号" />
        <el-table-column prop="isAdditional" label="是否补充记录" >
          <template scope="scope">
            <span v-if="scope.row.isAdditional === 1">是</span>
            <span v-else-if="scope.row.isAdditional === 0">否</span>
          </template>
        </el-table-column>
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

      <!-- 参与任务的设备信息 -->
      <el-table
        v-loading="listLoading"
        :data="list_eq"
        stripe
        border
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="equipmentName" label="设备名称" />
        <el-table-column prop="equipmentCode" label="设备编号" />
        <el-table-column prop="taskCode" label="任务编号" />
        <el-table-column prop="isAdditional" label="是否为补充记录" >
          <template scope="scope">
            <span v-if="scope.row.isAdditional === 1">是</span>
            <span v-else-if="scope.row.isAdditional === 0">否</span>
          </template>
        </el-table-column>
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
  import api from "@/api/system/equipmentUse";
  import * as XLSX from 'xlsx';
  export default {
    data() {
      return {
        listLoading: false, // 数据是否正在加载
        list: null, // banner列表
        list_eq: null,
        total: 0, // 数据库中的总记录数
        total_eq: 0,
        page: 1, // 默认页码
        limit: 10, // 每页记录数
        searchObj: {}, // 查询表单对象
        dialogVisible: false,
        sysTaskDevice: {},
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
        Promise.all([
          api.taskUserFinder(this.page, this.limit, this.searchObj),
          api.taskDeviceFinder(this.page, this.limit, this.searchObj)
        ])
          .then(([userResponse, equipmentResponse]) => {
            this.list = userResponse.data.records;
            this.list_eq = equipmentResponse.data.records;
            this.total = userResponse.data.total;
            this.total_eq = equipmentResponse.data.total;
            console.log(this.list);
            console.log(this.list_eq);
            const userFilteredData = this.list.map(item => ({
              任务编号: item.taskCode,
              检测人姓名: item.userName,    // 修改字段名称
              检测人编号: item.employeeCode, // 修改字段名称
              是否为补充记录: item.isAdditional === 1 ? '是': '否', // 修改字段名称
            }));
            const equipmentFilteredData = this.list_eq.map(item => ({
              任务编号: item.taskCode,
              设备名称: item.equipmentName,    // 修改字段名称
              设备编号: item.equipmentCode, // 修改字段名称
              是否为补充记录: item.isAdditional === 1 ? '是': '否', // 修改字段名称
            }));

            // 将数据转换为工作表
            const userworksheet = XLSX.utils.json_to_sheet(userFilteredData,{header:['任务编号','检测人姓名','检测人编号','是否为补充记录']});
            const equipmentworksheet = XLSX.utils.json_to_sheet(equipmentFilteredData,{header:['任务编号','设备名称','设备编号','是否为补充记录']});

            // 创建工作簿并添加工作表
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, userworksheet, '任务参与人员列表');
            XLSX.utils.book_append_sheet(workbook, equipmentworksheet, '任务所使用设备列表')

            // 导出Excel文件
            XLSX.writeFile(workbook, 'data.xlsx');
          })
          .finally(() =>{
            this.limit = 10;
            this.fetchData();
          });
      },

      // 重置查询表单
      resetData() {
        console.log("重置查询表单");
        this.searchObj = {};
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
        api.taskUserFinder(this.page, this.limit, this.searchObj)
          .then((response) => {
            console.log(response);
            this.list = response.data.records;
            this.total = response.data.total;
          });
        api.taskDeviceFinder(this.page, this.limit, this.searchObj)
          .then((response) => {
            console.log(response);
            this.list_eq = response.data.records;
            this.total_eq = response.data.total;
          });
      },
    },
  };
  </script>
