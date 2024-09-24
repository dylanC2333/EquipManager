<template>
    <div class="app-container">
      任务所使用设备查询列表
      <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关 键 字">
                <el-input
                  style="width: 95%"
                  v-model="searchObj.keyword"
                  placeholder="任务编码"
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
          </el-row>
        </el-form>
      </div>
  
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        border
        style="width: 100%; margin-top: 10px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
  
        <el-table-column prop="equipmentName" label="设备名称" />
        <el-table-column prop="equipmentCode" label="设备编码" />
        <el-table-column prop="equipmentUseDate" label="设备使用时间" />
      </el-table>
  
      <!-- 分页组件 -->
      <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="fetchData"
      />
    </div>
  </template>
  <script>
  import api from "@/api/system/equipmentUse";
  export default {
    data() {
      return {
        listLoading: false, // 数据是否正在加载
        list: null, // banner列表
        total: 0, // 数据库中的总记录数
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
      // 重置查询表单
      resetData() {
        console.log("重置查询表单");
        this.searchObj = {};
        this.fetchData();
      },
      //列表
      fetchData(page = 1) {
        this.page = page;
        api
          .taskDeviceFinder(this.page, this.limit, this.searchObj)
          .then((response) => {
            this.list = response.data.records;
            this.total = response.data.total;
          });
      },
    },
  };
  </script>
  