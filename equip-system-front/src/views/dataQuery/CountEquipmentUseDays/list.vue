<template>
    <div class="app-container">
        查询设备在一段时间的使用天数
      <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关 键 字">
                <el-input
                  style="width: 95%"
                  v-model="searchObj.keyword"
                  placeholder="设备编号"
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
            
          </el-row>
        </el-form>
      </div>

      

      <!-- 设备信息 -->
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
        <el-table-column prop="equipmentCode" label="设备编号" />
        <el-table-column prop="useDayCount" label="使用天数" />
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
  import api from "@/api/system/equip";
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
        api.EquipmentUseDayCount(this.page, this.limit, this.searchObj)
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