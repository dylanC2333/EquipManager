<template>
  <div class="app-container">
    设备检测列表
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input
                style="width: 100%"
                v-model="searchObj.keyword"
                placeholder="任务编号/员工编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
    >
      <el-table-column type="selection" />

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="employeeId" label="目测人id" />
      <el-table-column prop="taskId" label="任务单号" />
      <el-table-column prop="startTime" label="开始日期" />
      <el-table-column prop="endTime" label="结束日期" />
      <el-table-column prop="detectionLocation" label="任务地点" />
      <el-table-column prop="remarks" label="备注" />
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
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <!-- 添加、修改 弹框 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysEquipDetction"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="目测人id">
          <el-input v-model="sysEquipDetction.employeeId" />
        </el-form-item>
        <el-form-item label="任务单号">
          <el-input v-model="sysEquipDetction.taskId" />
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="sysEquipDetction.startTime" />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-input v-model="sysEquipDetction.endTime" />
        </el-form-item>
        <el-form-item label="任务地点">
          <el-input v-model="sysEquipDetction.detectionLocation" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="sysEquipDetction.remarks" />
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
import api from "@/api/system/equipDetection";
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], // 设备列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      dialogVisible: false, //弹框
      sysEquipDetction: {}, //封装添加表单数据
      multipleSelection: [], // 批量删除选中的记录列表
      createTimes: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
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
      api.getEquipDetctionId(id).then((response) => {
        this.sysEquipDetction = response.data;
      });
    },
    //添加或修改
    saveOrUpdate() {
      if (!this.sysEquipDetction.id) {
        this.saveEquipDetection();
      } else {
        this.updateEquipDetection();
      }
    },
    //修改方法
    updateEquipDetection() {
      api.update(this.sysEquipDetction).then((response) => {
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
    saveEquipDetection() {
      api.saveEquipDection(this.sysEquipDetction).then((response) => {
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
      this.sysEquipDetction = {};
    },
    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
        });
    },
  },
};
</script>

