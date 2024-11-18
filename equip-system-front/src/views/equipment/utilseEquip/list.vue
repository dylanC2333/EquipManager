<template>
  <div class="app-container">
    设备使用列表
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input
                style="width: 100%"
                v-model="searchObj.keyword"
                placeholder="设备编号/操作人编号/任务编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="操作时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd"
                style="margin-right: 10px; width: 100%"
              />
            </el-form-item>
          </el-col> -->
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

    <!-- 添加工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
      <el-button class="btn-add" size="mini" @click="batchRemove()"
        >批量删除</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
      @sort-change="onSortChange"
      :default-sort = "{prop: 'createTime', order:'ascending'}"
      :sort-orders="['ascending','descending']"
    >
      <el-table-column type="selection" />

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="equipmentCode" label="设备编号" sortable="custom"/>
      <el-table-column prop="equipmentUseName" label="设备名称" sortable="custom"/>
      <el-table-column prop="taskCode" label="任务编号" sortable="custom"/>
      <el-table-column prop="equipmentUseDate" label="使用日期" sortable="custom"/>
      <el-table-column prop="employeeUseCode" label="使用人编号"/>
      <el-table-column prop="employeeUseName" label="使用人姓名"/>
      <el-table-column prop="location" label="地点" />
      <el-table-column prop="preUseEquipmentStatus" label="设备使用前状态" />
      <el-table-column prop="maintenanceStatus" label="维护保养情况" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
            title="修改"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
            title="删除"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="fetchData"
      :current-page="page"
      :page-sizes="[1, 5, 10, 50, 100]"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"/>

    <!-- 添加、修改 弹框 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysEquipUse"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
        :rules = "rules"
      >
        <el-form-item label="设备编号"  prop = "equipmentCode">
          <el-input v-model="sysEquipUse.equipmentCode" />
        </el-form-item>
        <el-form-item label="任务编号" prop="taskCode">
            <el-row>
              <el-col :span="12">
                <el-input v-model="taskCodeParts.year" placeholder="    请输入年份,例如2024">
                  <template slot="prefix">RW-</template>
                </el-input>
              </el-col>
              <el-col  :span="12">
                <el-input v-model="taskCodeParts.number" placeholder="请输入序列号,例如001">
                  <template slot="prefix" >-</template>
                </el-input>
              </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="使用人编号" prop = "employeeUseCode">
          <el-input disabled v-model="sysEquipUse.employeeUseCode" />
        </el-form-item>
        <el-form-item label="使用日期"  prop = "equipmentUseDate">
          <el-date-picker disabled 
            v-model="sysEquipUse.equipmentUseDate"
            type="date"
            placeholder="选择日期"
            value-format = "yyyy-MM-dd"
            @input="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点"  prop = "location">
          <el-cascader
            :options="pcTextArr"
            v-model="selectedLocations"
            filterable
            @change="handleLocationChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="设备使用前状态"  prop = "preUseEquipmentStatus">
          <el-radio v-model="sysEquipUse.preUseEquipmentStatus" label="正常">正常</el-radio>
          <el-radio v-model="sysEquipUse.preUseEquipmentStatus" label="异常">异常</el-radio>
        </el-form-item>
        <el-form-item label="维护保养情况"  prop = "maintenanceStatus">
          <el-input v-model="sysEquipUse.maintenanceStatus" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
          size="small"
          icon="el-icon-refresh-right"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="saveOrUpdate()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/system/equipmentUse";
import {  pcTextArr } from "element-china-area-data";
import userapi from "@/api/system/user";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], // 设备列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      column:'createTime',//排序字段
      sortorder:'descending',//升降序条件


      dialogVisible: false, //弹框
      sysEquipUse: {}, //封装添加表单数据
      multipleSelection: [], // 批量删除选中的记录列表
      createTimes: [],

      pcTextArr,//省市二级地址，纯汉字
      selectedLocations:[],// 选中的省市地址数据

      userqueryList:[],
      userIdList:[],

      taskCodeParts: { year: '', number: '' },//任务单号组件数据

      rules:{// 表单校验规则
        employeeUseCode:[
          { required : true , message : "必填" },
        ],
        equipmentCode : [
          { required : true , message : "必填" },
        ],
        taskCode :[
          { validator: this.validateTaskCode, trigger:'blur' },
        ],
        equipmentUseDate : [
          { required : true , message : "必填" },
        ],
        location:[
          { required : true , message : "必填" },
        ],
        preUseEquipmentStatus : [
          { required : true , message : "必填" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchData();
  },
  mounted() {
      this.loadUserQuery();
  },
  methods: {

    //任务编号校验
    validateTaskCode(rule, value ,callback){
      const yearPattern = /^\d{4}$/; // 4位数字
      const numberPattern = /^\d{3}$/; // 3位数字
      
      if (!this.taskCodeParts.year || !this.taskCodeParts.number) {
        callback(new Error("年份和序列号为必填项"));
      } else if (!yearPattern.test(this.taskCodeParts.year)) {
        callback(new Error("年份必须为4位数字"));
      } else if (!numberPattern.test(this.taskCodeParts.number)) {
        callback(new Error("序列号必须为3位数字"));
      } else {
        this.sysEquipUse.taskCode = this.taskCodeConcat(this.taskCodeParts);
        callback();
      }
    },

    // 任务编号分割显示
    taskCodeSplit(fullCode){
      // 使用正则表达式匹配并提取年份和序列号
      const regex = /^RW-(\d{4})-(\d{3})$/;
      const matches = fullCode.match(regex);
      if (matches) {
        return {
          year: matches[1],  // 提取年份
          number: matches[2]  // 提取序列号
        };
      } else {
        throw new Error("格式不正确");
      }
    },

    // 任务编号拼接
    taskCodeConcat(parts){
      let fullcode = "RW-" + parts.year +"-" + parts.number;
      return fullcode;
    },

    // 日期选择器强制更新方法
    dateChange(){
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },

    // 地址选择变化调用
    handleLocationChange(value){
      // console.log(value);
      this.sysEquipUse.location = ""
      this.sysEquipUse.location += value[0];
      this.sysEquipUse.location += value[1];
      // console.log(this.sysEquipUse.location);
    },

    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection);
      this.multipleSelection = selection;
    },

    // 每页显示记录数改变时调用
    handleSizeChange(currentLimit){
      this.limit = currentLimit;
      this.fetchData();
      //console.log(this.limit);
    },

    // 表格排序
    onSortChange({prop,order}){
      this.column = prop;
      this.sortorder = order;
      // console.log(this.column)
      // console.log(this.sortorder)
      this.fetchData()
    },



    // 批量删除
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择要删除的记录！");
        return;
      }
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        // 调用api
        api.batchRemove(idList).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //关闭弹框
          this.dialogVisible = false;
          //刷新页面
          this.fetchData();
        });
      });
    },

    //修改-数据回显
    edit(id) {
      this.dialogVisible = true;
      api.getEquipUseId(id).then((response) => {
        this.sysEquipUse = response.data;
        //获取任务单号以后进行分割。
        this.taskCodeParts = this.taskCodeSplit(this.sysEquipUse.taskCode);
        //获取地址信息以后尽心分割
        this.selectedLocations = this.locationSplit(this.sysEquipUse.location);
      });
    },


    // 地址数据回显格式分割转换
    locationSplit(address){
        // console.log("locationSplit in")
        // 针对不同的情况进行匹配
        let province, city
        // 判断是否是直辖市（例如，北京市，上海市等）
        if (address.includes("北京市") || address.includes("上海市") ||
            address.includes("天津市") || address.includes("重庆市")) {
            let matchArray = address.match(/(.*?市)(.*)/);
            if (matchArray) {
                province = matchArray[1];  // 北京市、上海市等
                city = matchArray[2];      // 直辖市下属的区县
            }
        }
        // 判断是否是自治区（如“广西壮族自治区南宁市”）
        else if (address.includes("自治区")) {
            let matchArray = address.match(/(.*?自治区)(.*)/);
            if (matchArray) {
                province = matchArray[1];  // 广西壮族自治区等
                city = matchArray[2];      // 南宁市
            }
        }
        // 普通省份处理
        else {
            let matchArray = address.match(/(.*?省)(.*)/);
            if (matchArray) {
                province = matchArray[1];  // 省
                city = matchArray[2];      // 市
            }
        }
        // 处理完成放入级联选择器数据模型
        if (province && city) {
          // console.log(province);
          // console.log(city);
          return [province, city];
        }
    },

    //添加或修改
    //增加表单校验判断。
    saveOrUpdate() {
      //任务编号拼接
      this.sysEquipUse.taskCode = this.taskCodeConcat(this.taskCodeParts);
      //表单校验
      this.$refs.dataForm.validate((valid) =>{
        if(valid){
          if (!this.sysEquipUse.id) {
            this.saveEquipUse();
          } else {
            this.updateEquipUse();
          }
        } else{
          this.$message.error('请完善表单相关信息！');
          return false;
        }
      })
    },
    
    //修改方法
    updateEquipUse() {
      api.update(this.sysEquipUse).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //关闭弹框
        this.dialogVisible = false;
        //刷新页面
        this.fetchData();
      });
    },
    //添加
    saveEquipUse() {
      api.saveEquipUse(this.sysEquipUse).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //关闭弹框
        this.dialogVisible = false;
        //刷新页面
        this.fetchData();
      });
    },

    //弹出添加的表单
    add() {
      this.dialogVisible = true;
      this.sysEquipUse = {};
      this.selectedLocations = [];
      this.taskCodeParts = { year: '', number: '' },
      this.sysEquipUse.equipmentUseDate =  new Date();
      this.sysEquipUse.employeeUseCode = this.name;
    },

     // 根据id删除数据
     removeDataById(id) {
      // debugger
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //调用方法删除
        api.removeId(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.fetchData();
        });
      });
    },

    // 重置表单
    resetData() {
      console.log("重置查询表单");
      this.searchObj = {};
      this.createTimes = [];
      this.column = 'createTime';
      this.sortorder = 'descending';
      this.fetchData();
    },

    //条件分页查询
    fetchData(pageNum = 1) {
      this.page = pageNum;
      if (this.createTimes && this.createTimes.length == 2) {
        this.searchObj.startTime = this.createTimes[0];
        this.searchObj.endTime = this.createTimes[1];
      }
      // 调用api
      api.getPageList(this.page,this.limit,this.searchObj,this.column,this.sortorder)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          // console.log(response.data.records);
          // console.log(pcTextArr);
        });
    },
  },
};
</script>
