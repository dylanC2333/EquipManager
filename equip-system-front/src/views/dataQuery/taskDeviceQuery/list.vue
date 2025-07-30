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
                  placeholder="请输入任务编号，点击搜索按钮进行查询。"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display: flex">
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
            <el-col
              v-if="searchObj.keyword && taskStartDate && taskEndDate"
              :span="12"
              style="display: flex; align-items: center; gap: 10px; margin-left: 40px;"
            >
              <el-tag type="info" size="small" effect="plain">任务编号：</el-tag>
              <span>{{ searchObj.keyword }}</span>
              <el-tag type="success" size="small" effect="plain">初次打卡：</el-tag>
              <span>{{ taskStartDate }}</span>
              <el-tag type="warning" size="small" effect="plain">最新打卡：</el-tag>
              <span>{{ taskEndDate }}</span>
            </el-col>
            <el-col
              v-if="!(searchObj.keyword && taskStartDate && taskEndDate)"
              :span="12"
              style="display: flex; align-items: center; gap: 10px; margin-left: 40px;"
            >
              <el-tag type="info" size="small" effect="plain">任务编号：</el-tag>
              <div>
                无
              </div>
            </el-col>
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
        <el-table-column prop="title" label="职称" />
        
        <el-table-column label="证书编号" width= "500" class-name="certificate-column-class">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.selectedCertificates"
              multiple
              clearable
              placeholder="请选择证书"
              style="width: 100%;"
              :disabled="!scope.row.allCertificates || scope.row.allCertificates.length === 0"
            >
              <el-option
                v-for="cert in scope.row.allCertificates"
                v-if="cert.certificateNumber" 
                :key="cert.certificateNumber"
                :value="cert.certificateNumber"
                :label="cert.certificateName + ' - ' + cert.certificateNumber"
              >
                <span style="float: left">{{ cert.certificateName }}</span>
                <span style="float: left; color: #8492a6; font-size: 13px">{{ cert.certificateNumber }}</span>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
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
        <el-table-column prop="specification" label="规格型号" />
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
        :total="total_eq"/>
    </div>
  </template>
  <script>
  import api from "@/api/system/equipmentUse";
  import * as XLSX from 'xlsx';

  export default {
    data() {
      return {
        listLoading: false, // 数据是否正在加载
        list: [], // 列表初始化为空数组
        list_eq: [],
        total: 0, // 数据库中的总记录数
        total_eq: 0,
        page: 1, // 默认页码
        limit: 10, // 每页记录数
        searchObj: {}, // 查询表单对象
        dialogVisible: false,//弹窗可见控制
        taskStartDate: null, //任务首次打卡日期
        taskEndDate: null, //任务末次打卡日期
      };
    },
    created() {
    },
    methods: {

      search(){
        this.fetchData();//获取数据
      },

      //导出当前表格为Excel
      exportCurrent(){
        console.log("Exporting to Excel with current data...");

        // 导出前端的this.list，因为包含了用户的实时选择
        if (!this.list || this.list.length === 0) {
          this.$message.warning("没有可导出的人员数据");
          return;
        }

        // 2. 准备要导出的用户数据
        const userExportData = this.list.map(item => ({
          '检测人姓名': item.userName,
          '检测人编号': item.employeeCode,
          '职称': item.title,
          '证书编号': item.selectedCertificates.join(','), 
          '任务编号': item.taskCode,
          '是否补充记录': item.isAdditional === 1 ? '是' : '否'
        }));

        // 3. 准备要导出的设备数据（这部分逻辑保持不变）
        const equipmentExportData = this.list_eq.map(item => ({
          '任务编号': item.taskCode,
          '设备名称': item.equipmentName,
          '设备编号': item.equipmentCode,
          '规格型号': item.specification,
          '是否为补充记录': item.isAdditional === 1 ? '是': '否',
        }));

        // 将数据转换为工作表
        const userworksheet = XLSX.utils.json_to_sheet(userExportData);
        const equipmentworksheet = XLSX.utils.json_to_sheet(equipmentExportData);

        // (可选，但建议) 为人员列表设置更合适的列宽
        userworksheet['!cols'] = [
            { wch: 15 }, // 检测人姓名
            { wch: 15 }, // 检测人编号
            { wch: 20 }, // 职称
            { wch: 45 }, // 证书编号 (给一个较宽的列)
            { wch: 20 }, // 任务编号
            { wch: 15 }  // 是否补充记录
        ];

        // 创建工作簿并添加工作表
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, userworksheet, '任务参与人员列表');
        XLSX.utils.book_append_sheet(workbook, equipmentworksheet, '任务所使用设备列表')

        // 导出Excel文件
        XLSX.writeFile(workbook, `任务数据-${this.searchObj.keyword || '请选择任务'}.xlsx`);
      },

      // 重置查询表单
      resetData() {
        console.log("重置查询表单");
        this.searchObj = {};
        this.false = false;
        this.taskStartDate = null; //任务首次打卡日期
        this.taskEndDate = null; //任务末次打卡日期
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
        this.listLoading = true;

        //获取人员列表
        api.taskUserFinder(this.page, this.limit, this.searchObj)
          .then((response) => {
            // console.log(response);
            const records = response.data.records || [];
            this.total = response.data.total;

             // 遍历从后端获取的每条用户记录
            records.forEach(user => {
              // 为每条记录动态添加一个 selectedCertificates 属性，用于存储选中的证书编号数组
              // 使用 this.$set 来确保这个新属性是响应式的 (在Vue 2中非常重要)
              this.$set(user, 'selectedCertificates', []);
            });

            
            this.list = records;
            this.listLoading = false;
          });


        //获取设备列表
        api.taskDeviceFinder(this.page, this.limit, this.searchObj)
          .then((response) => {
            // console.log(response);
            this.list_eq = response.data.records;
            this.total_eq = response.data.total;
          });
        
        // 清空旧日期，避免展示旧数据
        this.taskStartDate = null;
        this.taskEndDate = null;
        api.taskDateRangeFinder(this.searchObj)
          .then((response) => {
            // console.log(response);
            this.taskStartDate = response.data.taskStartDate;
            this.taskEndDate = response.data.taskEndDate;
          });
      },
    },
  };
  </script>
<style> /* 保持非 scoped 状态以确保最高优先级 */

/* 关键修改：
  我们的目标不再是 .el-select 这个外层包裹组件，
  而是您找到的、真正控制宽度的 .el-input 这个内部容器。
*/
.certificate-column-class .el-input {
    width: 95% !important;
}

</style>
