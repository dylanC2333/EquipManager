<template>
  <div class="app-container">
    空闲设备查询列表
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="7">
            <el-form-item label="关 键 字">
              <el-input
                style="width: 95%"
                v-model="searchObj.keyword"
                placeholder="设备名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="地点">
              <el-select v-model="sysEquipFinder.location" placeholder="请选择">
                <el-option
                  v-for="item in pcTextArr"
                  :key="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="操作时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-right: 10px; width: 100%"
              />
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

      <el-table-column prop="equipmentCode" label="设备编号" />
      <el-table-column prop="equipmentName" label="设备名称" />
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
import api from "@/api/system/equipStock";
import {  pcTextArr  } from "element-china-area-data";
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象

      createTimes: [],

      dialogVisible: false,
      sysEquipFinder: [],
      pcTextArr, //省市二级地址，纯汉字
      selectedLocations: [], // 选中的省市地址数据
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
      api.equipmentFinder(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          console.log(this.list);
          const equipmentFilteredData = this.list.map(item => ({
            设备名称: item.equipmentName,    // 修改字段名称
            设备编号: item.equipmentCode, // 修改字段名称
          }));

          // 将数据转换为工作表
          const equipmentworksheet = XLSX.utils.json_to_sheet(equipmentFilteredData,{header:['设备名称','设备编号']});
          
          // 创建工作簿并添加工作表
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, equipmentworksheet, '空闲设备列表')
          
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
      this.createTimes = [];
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
      if (this.createTimes && this.createTimes.length == 2) {
        debugger;
        this.searchObj.startTime = this.createTimes[0];
        this.searchObj.endTime = this.createTimes[1];
      }
      api.equipmentFinder(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
        });
    },
  },
};
</script>
