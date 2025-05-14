<template>
    <div class="app-container">
  
      <div class="tools-div">
      <el-button icon="el-icon-refresh" type="primary" size="medium" @click="passwordUpdate"
              >密码重置</el-button
            >
      </div>
  
          <!-- 重置密码弹框 -->
      <el-dialog title="重置密码" :visible.sync="dialogVisible" width="40%">
        <el-form 
          ref="dataForm" 
          :model="sysUser" 
          label-width="150px" 
          size="small" 
          style="padding-right: 40px;"
          :rules = "rules"
        >
          <el-form-item label="目标用户编号:" prop="userCode" label-width="120px">
            <el-input v-model="sysUser.userCode" placeholder="用户编号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
          <el-button type="primary" icon="el-icon-check" @click="handlepasswordReset()" size="small">确 定</el-button>
        </span>
      </el-dialog>
  </div>
  </template>
<script>
import userapi from "@/api/system/user";
export default{
    //属性和方法
    data() {
        return {
            dialogVisible: false,
            sysUser : {},
            sysUserTarget : {},
            searchObj : {},
            rules:{
            userCode:[
                { required: true, message : '必填'},
            ],
            }
        };
    },
    created(){
    },
    methods:  {

        //修改密码弹框，重置为空
        passwordUpdate() {
            // console.log("dialog!")
            this.dialogVisible = true;
            this.sysUser = { userCode: '' };
            this.sysUserTarget = {};
            console.log(this.sysUser);
        },

        //提交修改，校验并获取原来待修改用户信息
        async handlepasswordReset() {
            this.sysUser.password = '11111111';
            this.searchObj.keyword = this.sysUser.userCode;

            try {
                // 表单验证改为 await 形式
                await new Promise((resolve, reject) => {
                    this.$refs.dataForm.validate(valid => {
                        if (valid) resolve();
                        else reject(new Error("表单校验失败"));
                    });
                });

                const response = await userapi.getPageList(1, 1, this.searchObj, 'user_code', 'descending');

                const records = response?.data?.records;
                if (!records || records.length === 0) {
                    this.$message.error('用户不存在');
                return;
                }

                const targetUser = records[0];
                if (targetUser.userCode !== this.sysUser.userCode) {
                    this.$message.error('请检查输入的用户编号是否正确！');
                return;
                }

                // 修改密码并提交
                this.sysUserTarget = { ...targetUser, password: this.sysUser.password };
                this.submitPasswordReset();
                
            } catch (err) {
                // 表单验证失败或请求异常都会走这里
                this.$message.error('请检查输入的用户编号是否正确或系统异常！');
                console.error('密码重置异常:', err);
            }
        },

        // 修改密码，调用接口更改
        submitPasswordReset(){
            this.$confirm("确认重置" + this.sysUserTarget.userName + "的用户密码?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(()=>{
                userapi.passwordChange(this.sysUserTarget).then( res => {
                    console.log("password have changed!")
                    if (res.code == '200') {
                        this.$message.success(res.message)
                        this.dialogVisible = false;
                        this.$refs.dataForm.resetFields();
                        setTimeout(() => {
                            this.dialogVisible = false;
                            this.$refs.dataForm.resetFields();
                            this.sysUser = { userCode: '' };
                        }, 1000);
                    } else {
                        this.$message.error(res.message)
                    }
                })
            })
        }
    }
}
</script>
      