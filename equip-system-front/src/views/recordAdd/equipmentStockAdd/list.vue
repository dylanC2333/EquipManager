<template>
    <div class="app-container">
      设备出入库列表
      <!--查询表单-->
      <div class="search-div">
        <el-form label-width="70px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="关 键 字">
                <el-input
                  style="width: 100%"
                  v-model="searchObj.keyword"
                  placeholder="设备编号/任务单号/出入库日期/员工编号"
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
        :sort-orders="['ascending','descending']"
      >
        <el-table-column type="selection" />
  
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="出入库类型"  sortable="custom"/>
        <el-table-column prop="equipmentCode" label="设备编号" sortable="custom"/>
        <el-table-column prop="equipmentName" label="设备名称" sortable="custom"/>
        <el-table-column prop="equipmentDate" label="设备出入库日期" sortable="custom"/>
        <el-table-column prop="userName" label="出库人姓名" />
        <el-table-column prop="userCode" label="出入库人工号" />
        <el-table-column prop="taskCode" label="任务单号" sortable="custom"/>
        <el-table-column prop="warehouseManagerName" label="仓库管理员姓名" />
        <el-table-column prop="warehouseManagerCode" label="仓库管理员工号" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column prop="isAdditional" label="是否补充记录" >
          <template scope="scope">
            <span v-if="scope.row.isAdditional === 1">是</span>
            <span v-else-if="scope.row.isAdditional === 0">否</span>
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
          :model="sysEquipStock"
          label-width="150px"
          size="small"
          style="padding-right: 40px"
        :rules = "rules"
        >
          <el-form-item label="设备编号" prop="equipmentCode">
            <el-input v-model="sysEquipStock.equipmentCode" />
          </el-form-item>
          <el-form-item label="设备出/入库日期" prop="equipmentDate">
            <el-date-picker
              v-model="sysEquipStock.equipmentDate"
              type="date"
              placeholder="选择日期"
              value-format = "yyyy-MM-dd"
              @input="dateChange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出/入库人工号" prop="userCode">
            <el-input v-model="sysEquipStock.userCode" />
          </el-form-item>
          <el-form-item label="任务单号" prop="taskCode">
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
          <el-form-item label="仓库管理员工号" prop="warehouseManagerCode">
            <el-input v-model="sysEquipStock.warehouseManagerCode" />
          </el-form-item>
          <el-form-item label="出入库类型" prop="type">
            <el-radio v-model="sysEquipStock.type" label="出库">出库</el-radio>
            <el-radio v-model="sysEquipStock.type" label="入库">入库</el-radio>
          </el-form-item>
          <el-form-item label="备注"  prop="remarks">
            <el-input v-model="sysEquipStock.remarks" />
          </el-form-item>
          <el-form-item label="是否为补充记录"  prop="isAdditional">
            <el-radio v-model="sysEquipStock.isAdditional" :label="1">是</el-radio>
            <el-radio v-model="sysEquipStock.isAdditional" :label="0">否</el-radio>
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
  import api from "@/api/system/equipStock";
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
        sysEquipStock: {}, //封装添加表单数据
        multipleSelection: [], // 批量删除选中的记录列表
        createTimes: [],

        taskCodeParts: { year: '', number: '' },    
        
        rules:{//表单校验规则
          //任务编号自定义验证规则，验证两个组件。
          taskCode:[
            { validator: this.validateTaskCode, trigger:'blur'},
          ],
          equipmentCode:[
            { required: true, message : '必填'},
          ],
          equipmentDate:[
            { required: true, message : '必填'},
          ],
          userCode:[
            { required: true, message : '必填'},
          ],
          warehouseManagerCode:[
            { required: true, message : '必填'},
          ],
          type:[
            { required: true, message : '必填'},
          ],
          isAdditional:[
            { required: true, message : '必填'},
          ],
          remarks:[
          ],
        },
      };
    },
    created() {
      this.fetchData();
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
          this.sysEquipStock.taskCode = this.taskCodeConcat(this.taskCodeParts);
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
  
      // 当多选选项发生变化的时候调用
      handleSelectionChange(selection) {
        console.log(selection);
        this.multipleSelection = selection;
      },
  
      // 每页显示记录数改变
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
        api.getEquipStockId(id).then((response) => {
          this.sysEquipStock = response.data;
          //获取数据以后进行分割。
          this.taskCodeParts = this.taskCodeSplit(this.sysEquipStock.taskCode);
        });
      },

      //添加或修改
      saveOrUpdate() {
        //任务编号拼接
        this.sysEquipStock.taskCode = this.taskCodeConcat(this.taskCodeParts);
        //表单校验
        this.$refs.dataForm.validate((valid) =>{
          if(valid){
            if (!this.sysEquipStock.id) {
              this.saveEquipStock();
            } else {
              this.updateEquipStock();
            }
          } else {
            this.$message.error('请完善表单相关信息！');
            return false;
          }
        })
      },

      //修改方法
      updateEquipStock() {
        api.update(this.sysEquipStock).then((response) => {
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
      saveEquipStock() {
        api.saveEquipStock(this.sysEquipStock).then((response) => {
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
        this.sysEquipStock = {};
        this.taskCodeParts = { year: '', number: '' },
        this.sysEquipStock.equipmentDate =  new Date();
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
            console.log(this.list);
          });
      },
    },
  };
  </script>
  