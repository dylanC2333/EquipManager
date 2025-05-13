<template>
  <div class="app-container">

    <!-- 当前用户显示用户编号。 -->
    当前用户：{{ this.name }}
    <div class="tools-div">
    <el-button icon="el-icon-refresh" size="medium" @click="passwordUpdate"
            >修改密码</el-button
          >
    </div>

        <!-- 修改密码弹框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="40%" @close="handleCloseDialog">
      <el-form 
        ref="dataForm" 
        :model="dataForm" 
        label-width="150px" 
        size="small" 
        style="padding-right: 40px;"
        :rules = "dataFormRules"
      >
        <el-form-item label="新密码:" prop="newpassword" label-width="100px">
          <el-input v-model="dataForm.newpassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkpassword" label-width="100px">
          <el-input v-model="dataForm.checkpassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="handlepasswordChange()" size="small">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import userapi from "@/api/system/user";
import { mapGetters } from 'vuex'
const defaultForm = {
    newpassword: '',
    checkpassword: ''
}
export default{

    //属性和方法
    data() {
          var checkNewPw = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请再次输入密码'));
            }
            if (this.dataForm.newpassword !== value) {
              callback(new Error("密码不一致"));
            } else {
              callback()
            }
          };
        return {
            dialogVisible: false,
            dataForm: defaultForm,
            sysUser :{},
            searchObj : {},

            dataFormRules: {
              newpassword: [
                { required: true,  message: '请输入新密码', trigger: 'blur' },
                { min: 8, message: '密码长度不少于8个字符', trigger: 'blur' },
              ],
              checkpassword: [{
                required: true,
                validator: checkNewPw,
                trigger: 'blur'
              }]
            },
        };
    },
    created(){
    },
    computed: {
    ...mapGetters([
      'name'
    ])
    },
    methods:  {
        //关闭时候清空表单
        handleCloseDialog() {
        this.$refs.dataForm.resetFields();
        },

        //修改密码弹框，获取用户信息
        passwordUpdate() {
            // console.log("dialog!")
            this.dialogVisible = true;
            this.dataForm = defaultForm;
            this.searchObj.keyword = this.name;
            // console.log("keyword "+this.searchObj.keyword);
            userapi.getPageList(1,1,this.searchObj,'user_code','descending').then(response =>{
                  // console.log(response);
                  this.sysUser = response.data.records[0];
                  // console.log(this.sysUser);
            })
        },

        //修改密码，调用接口更改
        handlepasswordChange(){
            // console.log("new:"+this.dataForm.newpassword)
            // console.log("check:"+this.dataForm.checkpassword)
            this.sysUser.password = this.dataForm.newpassword;
            // console.log(this.sysUser);
            this.$refs.dataForm.validate((valid) => {
              if (valid){
                userapi.passwordChange(this.sysUser).then( res => {
                    console.log("password have changed!")
                    if (res.code == '200') {
                        this.$message.success(res.message)
                        this.dialogVisible = false;
                        this.$refs.dataForm.resetFields();
                        setTimeout(function () {
                            that.quitHander()
                        }, 1000)
                    } else {
                        this.$message.error(res.message)
                    }
                })
              } else{
                this.$message.error('请检查密码输入！');
              }
            })
        }
    }
}
</script>
    