<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关键字">
              <el-input style="width: 100%" v-model="searchObj.keyword" placeholder="用户姓名/用户编号/电话/用户详情"
                @keyup.enter.native="fetchData()"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 工具条,添加、批量删除 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add">添 加</el-button>
      <el-button class="btn-add" size="mini" @click="batchRemove()"> 批量删除</el-button>
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" stripe border style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange" @sort-change="onSortChange"
      :default-sort="{ prop: 'createTime', order: 'ascending' }" :sort-orders="['ascending', 'descending']">

      <el-table-column type="selection" />
      <!-- listLoading为加载组件，需要用的地方将其设为True即可 -->
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="userCode" label="用户工号" sortable="custom" />
      <el-table-column prop="userName" label="用户姓名" sortable="custom" />
      <el-table-column prop="description" label="用户详情" />
      <el-table-column prop="phone" label="电话号码" />
      <el-table-column prop="createTime" label="创建时间" width="160" sortable="custom" />
      <el-table-column prop="status" label="在职状态">
        <template scope="scope">
          <span v-if="scope.row.status === 1">在职</span>
          <span v-else-if="scope.row.status === 0">离职</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">

          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改" />
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" />
          <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showAssignRole(scope.row)"
            title="分配角色" />


        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="fetchData" :current-page="page"
      :page-sizes="[1, 5, 10, 50, 100]" :page-size="limit" style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper" :total="total" />

    <!-- 添加、修改弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="sysUser" label-width="150px" size="small" style="padding-right: 40px;"
        :rules="rules">
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="sysUser.userName" />
        </el-form-item>
        <el-form-item label="用户工号" prop="userCode">
          <el-input v-model="sysUser.userCode" />
        </el-form-item>
        <el-form-item label="密码" v-if="!sysUser.id" prop="password">
          <el-input v-model="sysUser.password" type="password" />
        </el-form-item>
        <el-form-item label="用户详情" prop="description">
          <el-input v-model="sysUser.description" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="sysUser.phone" />
        </el-form-item>
        <el-form-item label="在职状态" prop="status">
          <el-radio v-model="sysUser.status" :label="1">在职</el-radio>
          <el-radio v-model="sysUser.status" :label="0">离职</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 角色分配弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
      <el-form label-width="80px">
        <el-form-item label="用户姓名">
          <el-input disabled :value="sysUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户工号">
          <el-input disabled :value="sysUser.userCode"></el-input>
        </el-form-item>

        <el-form-item label="角色列表">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
            @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="userRoleIds" @change="handleCheckedChange">
            <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="assignRole" size="small">保存</el-button>
        <el-button @click="dialogRoleVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
import roleApi from '@/api/system/role'
import api from '@/api/system/user'
export default {
  data() {
    //定义数据模型
    return {
      listLoading: false, // 数据是否正在加载
      list: [],//角色列表
      total: 0,//总记录数
      page: 1,//当前页
      limit: 10,//每页显示记录数
      searchObj: {},//条件查询封装对象
      column: 'createTime',//排序字段
      sortorder: 'descending',//升降序条件

      createdTimes: [],

      dialogVisible: false,//添加弹出框

      sysUser: {},//封装添加表单数据。
      multipleSelect: [],//批量删除选中的记录列表

      dialogRoleVisible: false,//分配角色弹出框
      allRoles: [], //所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false,// 是否是不确定的
      checkAll: false, // 是否全选

      rules: {// 表单校验规则
        userName: [
          { required: true, message: "必填" },
        ],
        userCode: [
          { required: true, message: "必填" },
        ],
        password: [
          { required: true, message: "必填" },
          { min: 8, message: "密码长度不少于8个字符", trigger: 'blur' },
        ],
        status: [
          { required: true, message: "必填" },
        ],
        phone: [
        ],
      },
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    //展示分配角色
    showAssignRole(row) {
      this.sysUser = row
      this.dialogRoleVisible = true
      roleApi.getRolesByUserId(row.id).then(response => {
        this.allRoles = response.data.allRoles
        this.userRoleIds = response.data.userRoleIds
        this.checkAll = this.userRoleIds.length == this.allRoles.length
        this.isIndeterminate = this.userRoleIds.length > 0 && this.userRoleIds.length < this.allRoles.length
        console.log(this.allRoles);
      })
    },

    /*
    全选勾选状态发生改变的监听
    */
    handleCheckAllChange(value) {// value 当前勾选状态true/false
      // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
      this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },

    /*
    角色列表选中项发生改变的监听
    */
    handleCheckedChange(value) {
      const { userRoleIds, allRoles } = this
      this.checkAll = userRoleIds.length === allRoles.length && allRoles.length > 0
      this.isIndeterminate = userRoleIds.length > 0 && userRoleIds.length < allRoles.length
    },

    //分配角色
    assignRole() {
      let assginRoleVo = {
        userId: this.sysUser.id,
        roleIdList: this.userRoleIds
      }
      console.log(assginRoleVo)
      roleApi.assignRoles(assginRoleVo).then(response => {
        console.log(this.userRoleIds)
        this.$message.success(response.message || '分配角色成功')
        this.dialogRoleVisible = false
        this.fetchData(this.page)
      })
    },
    // 多选变化方法
    handleSelectionChange() {

    },

    // 每页显示记录数改变
    handleSizeChange(currentLimit) {
      this.limit = currentLimit;
      this.fetchData();
      //console.log(this.limit);
    },

    // 表格排序
    onSortChange({ prop, order }) {
      this.column = prop;
      this.sortorder = order;
      // console.log(this.column)
      // console.log(this.sortorder)
      this.fetchData()
    },

    //修改-数据回显
    edit(id) {
      // 弹出框
      this.dialogVisible = true;
      api.getUserId(id).then(response => {
        this.sysUser = response.data
        console.log(this.sysUser)
      });
    },


    //添加或修改
    //增加表单校验判断。
    saveOrUpdate() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.sysUser.id) {
            this.saveUser();
          } else {
            this.updateUser();
          }
        } else {
          this.$message.error('请完善表单相关信息！');
          return false;
        }
      })
    },

    //修改的方法
    updateUser() {
      api.update(this.sysUser)
        .then(response => {
          //提示
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          //关闭弹窗
          this.dialogVisible = false
          //刷新页面
          this.fetchData()
        })
    },

    //添加方法
    saveUser() {
      console.log(this.sysUser)
      api.save(this.sysUser)
        .then(response => {
          //提示
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          //关闭弹窗
          this.dialogVisible = false
          //刷新页面
          this.fetchData()
        })
    },

    //点击添加，弹出框
    add() {
      this.dialogVisible = true;
      this.sysUser = {} //保证弹出以后，表为空
    },

    //通过id删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //调用方法删除
          api.removeId(id)
            .then(response => {
              //提示
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
          //刷新
          this.fetchData()
        })
    },
    //多选选项发生变化时调用
    handleSelectionChange(selection) {
      // console.log(selection)
      this.multipleSelect = selection
    },

    //批量删除batchRemove
    batchRemove() {
      if (this.multipleSelect.length == 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除选中角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确定后，调用ajax
        //遍历selection，将id放入id列表
        var idList = []
        this.multipleSelect.forEach(item => {
          idList.push(item.id)
        });
        // 调用api
        return api.branchRemove(idList)
      }).then(response => {
        this.fetchData()
        this.$message.success(response.message)
      }).catch(error => {
        if (error == 'cancel') {
          this.$message.info('取消删除')
        }
      })
    },

    // 重置表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.column = 'createTime';
      this.sortorder = 'descending';
      this.fetchData()
    },


    //获取数据列表
    fetchData(pageNum = 1) {
      // pageNum页数赋值
      this.page = pageNum
      // ajax调用后端接口
      //console.log(this.searchObj)
      api.getPageList(this.page, this.limit, this.searchObj, this.column, this.sortorder)
        .then(response => {
          console.log(response);
          // console.log(this.searchObj);
          // console.log(this.column);
          // console.log(this.sortorder);
          //先用控制台输出查看参数如何对应。
          //每页数据列表
          this.list = response.data.records
          //总记录数
          this.total = response.data.total
        })
    }
  }
}
</script>
