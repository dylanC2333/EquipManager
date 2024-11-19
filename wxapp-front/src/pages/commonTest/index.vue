<template>
  <tm-app color="#ffffff">
    <view class="container">
      <view class="main">
        <view class="title">
          <tm-text
            :font-size="50"
            color="#1a1a1a"
            :label="mainStore.getCurType()"
          ></tm-text>
        </view>
        <view class="status">
          <tm-alert
            color="#25b1bf"
            outlined
            border-style="dashed"
            :border="1"
            :content="{
              icon: 'tmicon-alert',
              content: '当前表单：' + mainStore.getCurInfo(),
            }"
            :height="80"
            :closable="false"
          ></tm-alert>
        </view>
        <view class="btns">
          <view class="btn">
            <tm-button
              block
              @click="hdAdd"
              color="#0085ff"
              :font-size="30"
              label="新建记录"
            ></tm-button>
          </view>
          <view class="btn">
            <tm-button
              block
              @click="hdUpload"
              color="#43A49B"
              :font-size="30"
              label="提交记录"
            ></tm-button>
          </view>
          <view class="btn">
            <tm-button
              block
              @click="hdSave"
              color="#ff983f"
              :font-size="30"
              label="保存记录"
            ></tm-button>
          </view>
          <view class="btn">
            <tm-button
              block
              @click="hdClear"
              label="清空记录"
              :font-size="30"
              color="#de283b"
            ></tm-button>
          </view>
        </view>
        <view v-if="flag" class="shown-table">
          <DataTable
            :data="tableData"
            @update="hdUpdate"
            @delete="hdDelete"
          ></DataTable>
        </view>
      </view>

      <FormModel
        v-model="record"
        :columns="columns"
        title="新建记录"
        v-model:output="showAddModel"
        add-record
        enter-tab
        @cancel="clearRecord"
        @confirm="addRecord"
        @add="addRecord"
      ></FormModel>

      <FormModel
        title="修改记录"
        v-model:output="showUpdateModel"
        v-model="record"
        :columns="columns"
        @close="clearRecord"
        @confirm="updateExistRecord"
      ></FormModel>

      <AskModel
        v-model:show="showClearModel"
        title="提示"
        content="是否确认清空所有记录"
        check-color="red"
        @check="deleteAllRecord"
      ></AskModel>

      <AskModel
        v-model:show="showUploadModel"
        title="提示"
        content="是否确认上传所有记录"
        check-color="green"
        @check="uploadRecords"
      ></AskModel>

      <AskModel
        v-model:show="showDeleteModel"
        title="提示"
        content="是否确认删除该记录"
        check-color="red"
        @check="deleteExistRecord"
      ></AskModel>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  afterUpload,
  createColumnsAndTable,
  deleteAllLocalData,
  deleteLocalData,
  getAttachmentOpts,
  getLocalData,
  getPureRecords,
  initDB,
  initDBTable,
  saveToLocal,
  statusToColor,
} from './columns'
import { handInManyRecords2Detail } from '@/api/receive'
import DataTable from './components/dataTable.vue'
import { useMainStore } from '@/store'
import { attachStableData } from '@/utils/columnsHandler'
import { toast } from '@/utils/message'
import FormModel from './components/formModel.vue'
import AskModel from './components/askModel.vue'

const mainStore = useMainStore()

const showAddModel = ref(false)
const showDeleteModel = ref(false)
const showClearModel = ref(false)
const showUpdateModel = ref(false)
const showUploadModel = ref(false)
const flag = ref(false)
let curDelete = -1
let curUpdate = -1
const columns = reactive<ColumnItem[]>([])
const tableData = reactive<TableDataType>(<TableDataType>{})
const record = ref<WithOptions<ColumnForm, 'update' | 'delete'>>({})

const setTableData = (data: ColumnForm[]) => {
  for (const c of data) {
    tableData.data.push({
      ...c,
      update: '修改',
      delete: '删除',
      ...getAttachmentOpts(statusToColor(c.status)),
    })
  }
}

const initAllRecords = async () => {
  tableData.data.length = 0
  const data = await getLocalData()
  setTableData(data)
}

const initRecord = () => {
  const lastOne = { ...tableData.data[tableData.data.length - 1] }
  if (lastOne) {
    delete lastOne.update
    delete lastOne.delete
    delete lastOne.opts
    delete lastOne.status
    for (const key in lastOne) {
      if (columns.find((item) => item.prop === key)?.echo) {
        record.value[key] = lastOne[key]
      }
    }
  }
}

createColumnsAndTable(columns, tableData)

initDB()
  .then(() => initDBTable(columns))
  .then(() => getLocalData())
  .then((res) => {
    setTableData(res)
    flag.value = true
  })

initRecord()

const clearRecord = () => {
  for (const key in record.value) {
    delete record.value[key]
  }
}

const isAllBlank = () => {
  return Object.values(record.value).every((v) => v === '')
}

const hdAdd = () => {
  initRecord()
  showAddModel.value = true
}

const hdUpdate = (index: number) => {
  for (const key in tableData.data[index]) {
    record.value[key] = tableData.data[index][key]
  }
  curUpdate = index
  showUpdateModel.value = true
}

const hdDelete = (index: number) => {
  curDelete = index
  showDeleteModel.value = true
}

const hdClear = () => {
  showClearModel.value = true
}

const hdSave = async () => {
  const rec = getPureRecords(tableData, false)
  await saveToLocal(rec)
  await initAllRecords()
  toast('保存成功')
}

const hdUpload = () => {
  if (tableData.data.length === 0) {
    toast('请先添加数据', 'none', 2000)
    return
  }
  showUploadModel.value = true
}

const uploadRecords = async () => {
  const rec = getPureRecords(tableData, false)
  if (!rec.length) {
    toast('没有未提交的数据', 'none', 2000)
    return
  }
  for (let i = 0; i < rec.length; i++) {
    if (rec[i]['status'] !== '已保存') {
      toast('请先保存所有数据', 'none', 2000)
      return
    }
  }
  rec.map((r) => attachStableData(r))
  await handInManyRecords2Detail(rec)
  await afterUpload(rec)
  await initAllRecords()
  toast('上传成功', 'success', 2000)
}

const deleteExistRecord = async () => {
  if (tableData.data[curDelete]['lid'] !== void 0) {
    await deleteLocalData(tableData.data[curDelete]['lid'])
  }
  tableData.data.splice(curDelete, 1)
}

const deleteAllRecord = async () => {
  const rec = getPureRecords(tableData)
  await deleteAllLocalData(rec)
  tableData.data.length = 0
}

const updateExistRecord = () => {
  tableData.data.splice(curUpdate, 1, {
    ...record.value,
    status: '未保存',
    ...getAttachmentOpts('red'),
  })
  clearRecord()
}

const addRecord = () => {
  if (isAllBlank()) {
    toast('请填写完整', 'error', 2000)
    return
  }
  tableData.data.push({
    ...record.value,
    update: '修改',
    delete: '删除',
    status: '未保存',
    ...getAttachmentOpts('red'),
  })
  clearRecord()
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  margin-top: 50upx;
  position: fixed;
  .main {
    margin: auto;
    width: 100vw;
    .shown-table {
      width: 90%;
      margin-left: 5%;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20upx;
    }
    .btns {
      display: flex;
      justify-content: space-between;
      margin-top: 20upx;
      margin-left: 5%;
      width: 90%;
      .btn {
        width: 20%;
      }
    }
    .status {
      width: 94%;
      margin-left: 3%;
    }
  }
}
.bottom-btn {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
