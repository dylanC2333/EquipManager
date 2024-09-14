<template>
  <div class="app-container">
        角色列表
    <!--查询表单-->
    <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称">
                <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display:flex">
            <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
          </el-row>
        </el-form>
    </div>
    <!-- 添加和批量删除按钮 -->
    <div class ="tools-div">
        <el-button type="success" icon = "el-icon-plus" size = "mini" @click="add"> 添 加</el-button>
        <el-button class="btn-add" size = "mini" @click="batchRemove()"> 批量删除</el-button>
    </div>
      

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
      @sort-change="onSortChange"
      :default-sort = "{prop: 'createTime', order:'descending'}"
      >

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" sortable/>
      <el-table-column prop="roleCode" label="角色编码" sortable/>
      <el-table-column prop="description" label="角色描述" sortable/>
      <el-table-column prop="createTime" label="创建时间" width="160" sortable/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除"/>
          <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showAssignAuth(scope.row)" title="分配权限"/>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="fetchData"
      :current-page="page"
      :page-sizes="[1, 5, 10, 20, 50, 100]"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"/>

    <!-- 添加弹框 -->
    <el-dialog title="添加角色" :visible.sync="adddialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="sysRole.description"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveRole()" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog title="修改角色" :visible.sync="editdialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="sysRole.description"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="updateRole()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>


<script>
import api from '@/api/system/role'

export default{
    //定义数据模型
    //定义初始值
    data() {
        return {
            list:[],//角色列表
            total:0,//总记录数
            page:1,//当前页
            limit:4,//每页显示记录数
            searchObj:{},//条件查询封装对象

            adddialogVisible:false ,//添加弹出框
            editdialogVisible:false,//修改弹出框
            sysRole:{},//封装添加表单数据。
            multipleSelect:[]//批量删除选中的记录列表
        }
    },
    //页面渲染之前执行
    created() {
        //调用列表方法
        this.fetchData()

    },
    methods:{//具体方法
        // 每页显示记录数改变时调用
        handleSizeChange(currentLimit){
          this.limit = currentLimit;
          this.fetchData();
          //console.log(this.limit);
        },

        // 分配权限跳转方法
        showAssignAuth(row){
          this.$router.push('/system/assignAuth?id='+row.id+'&roleName='+row.roleName);
        },


        //多选选项发生变化时调用
        handleSelectionChange(selection){
          // console.log(selection)
          this.multipleSelect = selection
        },

        //批量删除batchRemove
        batchRemove(){
          if (this.multipleSelect.length == 0){
            this.$message.warning('请选择要删除的记录！')
            return
          }
          this.$confirm('此操作将永久删除选中角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(()=>{
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
          }).catch(error =>{
            if (error == 'cancel'){
              this.$message.info('取消删除')
            }
          })
        },

        // 修改-数据回显
        edit(id){      
          // 弹出框
          this.editdialogVisible = true
          api.getRoleId(id).then(response =>{
            this.sysRole = response.data;
            console.log(response.data)
            console.log(response)
          });
        },
        //修改的方法
        updateRole() {
          console.log(this.sysRole);
          api.update(this.sysRole)
            .then(response =>{
              //提示
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              //关闭弹窗
              this.editdialogVisible = false
              //刷新页面
              this.fetchData()
            })
        },

        //点击添加，弹出框
        add(){
          this.adddialogVisible = true
          this.sysRole = {} //保证弹出以后，表为空
        },
        //添加方法
        saveRole(){
          api.saveRole(this.sysRole)
            .then(response =>{
              //提示
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              //关闭弹窗
              this.adddialogVisible = false
              //刷新页面
              this.fetchData()
            })
        },

        //删除
        removeDataById(id){
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //调用方法删除
            api.removeId(id)
              .then(response =>{
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

        //重置
        resetData(){
        //清空表单          
        this.searchObj = {}
        //查询所有数据
        this.fetchData()
        },

        //列表
        //pageNum为查询页数
        fetchData(pageNum=1){
            //页数赋值
            this.page = pageNum
            //ajax
            api.getPageList(this.page,this.limit,this.searchObj)
                .then(response => {
                    console.log(response)
                    // 每页数据列表
                    this.list = response.data.records
                    // 总记录数
                    this.total = response.data.total
                })
        }
    }
}
</script>