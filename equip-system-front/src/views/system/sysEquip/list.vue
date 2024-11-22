<template>
  <div class="app-container">
    设备列表
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关键字">
              <el-input
                style="width: 100%"
                v-model="searchObj.keyword"
                placeholder="设备名称/设备编号"
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

      <el-table-column prop="equipmentName" label="设备名称"  sortable="custom"/>
      <el-table-column prop="equipmentCode" label="设备编号"  sortable="custom"/>
      <el-table-column prop="specification" label="规格型号"  sortable="custom"/>
      <el-table-column prop="createTime" label="创建时间"  sortable="custom"/>
      <el-table-column prop="status" label="设备状态">
        <template scope="scope">
          <span v-if="scope.row.status === 1">正常使用</span>
          <span v-else-if="scope.row.status === 0">停用</span>
        </template>
      </el-table-column>
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
        :model="sysEquip"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
        :rules = "rules"
      >
        <el-form-item label="设备名称"  prop = "equipmentName">
          <el-input v-model="sysEquip.equipmentName"/>
        </el-form-item>
        <el-form-item label="设备编号" prop = "equipmentCode">
          <el-input v-model="sysEquip.equipmentCode" />
        </el-form-item>
        <el-form-item label="规格型号" prop = "specification">
          <el-input v-model="sysEquip.specification" />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-radio v-model="sysEquip.status" :label="1">正常使用</el-radio>
          <el-radio v-model="sysEquip.status" :label="0">停用</el-radio>
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
import api from "@/api/system/equip";
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
      sysEquip: {}, //封装添加表单数据
      multipleSelection: [], // 批量删除选中的记录列表
      
      rules:{// 表单校验规则
        equipmentName:[
          { required : true , message : "必填" },
        ],
        equipmentCode:[
          { required : true , message : "必填" },
        ],
        status:[
          { required : true , message : "必填" },
        ],
        specification:[
        { required : true , message : "必填" },
        ]
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {

    // 每页显示记录数改变时调用
      handleSizeChange(currentLimit){
      this.limit = currentLimit;
      this.fetchData();
      //console.log(this.limit);
    },

    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection);
      this.multipleSelection = selection;
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
      api.getEquipId(id).then((response) => {
        this.sysEquip = response.data;
      });
    },

    //添加或修改
    saveOrUpdate() {
      this.$refs.dataForm.validate((valid) =>{
        if(valid){
          if (!this.sysEquip.id) {
            this.saveEquip();
          } else {
            this.updateEquip();
          }
        } else{
          this.$message.error('请完善表单相关信息！');
          return false;
        }
      })
    },

    //修改方法
    updateEquip() {
      api.update(this.sysEquip).then((response) => {
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
    saveEquip() {
      api.saveEquip(this.sysEquip).then((response) => {
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
      this.sysEquip = {};
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
    // 表格排序
    onSortChange({prop,order}){
      this.column = prop;
      this.sortorder = order;
      // console.log(this.column)
      // console.log(this.sortorder)
      this.fetchData()
    },

    // 重置表单
    resetData() {
      console.log('重置查询表单');
      this.searchObj = {};
      this.column='createTime';
      this.sortorder='descending';
      this.fetchData()
    },
    //条件分页查询
    fetchData(pageNum = 1) {
      this.page = pageNum;
      // 调用api
      api.getPageList(this.page,this.limit,this.searchObj,this.column,this.sortorder)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
          // console.log(this.list);
        });
    },
  },
};
</script>
