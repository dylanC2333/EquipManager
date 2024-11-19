<template>
  <tm-app>
    <view class="container">
      <tm-button style="width: 30%; margin-bottom: 10rpx" @click="onclickOpenDB"
        >打开DB</tm-button
      >
      <tm-button style="width: 30%; margin-bottom: 10rpx" @click="onclickIsOpen"
        >是否打开</tm-button
      >
      <tm-button
        style="width: 30%; margin-bottom: 10rpx"
        @click="onclickCloseDB"
        >关闭DB</tm-button
      >
      <tm-button
        style="width: 30%; margin-bottom: 10rpx"
        @click="onclickCreateTable"
        >创建表</tm-button
      >
      <tm-button
        style="width: 30%; margin-bottom: 10rpx"
        @click="onclickSelectSQL"
        >查询内容</tm-button
      >
      <tm-button
        style="width: 30%; margin-bottom: 10rpx"
        @click="onclickInsertSQL"
        >插入内容</tm-button
      >
      <tm-button style="width: 30%; margin-bottom: 10rpx" @click="hdClick"
        >test</tm-button
      >
      <tm-button style="width: 30%;margin-bottom: 10rpx;" @click="onclickDropTable">删除表</tm-button>
			<tm-button style="width: 30%;margin-bottom: 10rpx;" @click="onclickIsExist">是否存在表</tm-button>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import {
  isOpen,
  openDB,
  closeDB,
  createTable,
  selectTableData,
  insertTableData,
  dropTable,
isTableExist,
deleteTableData,
} from '@/utils/db'
import { toast } from '@/utils/message'

const hdClick = async () => {
  const res = deleteTableData('lqlmysd')
  // const a = {
  //   name: 'zhangsan',
  //   age: '18'
  // }
  // const res = unfoldCondition(a)
  // toast(res)
}

const onclickOpenDB = async () => {
  const { message } = await openDB()
  toast(message)
}

const onclickIsOpen = async () => {
  const res = await isOpen()
  toast(res.message)
}

const onclickCloseDB = async () => {
  const res = await closeDB()
  toast(res.message)
}

const onclickCreateTable = async () => {
  const res = await createTable('user', {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    name: 'TEXT',
    age: 'INTEGER',
  })
  toast(res.message)
}

const onclickSelectSQL = async () => {
  const res = await selectTableData('lqlmysd', {
    proname: '延黄高速'
  })
  // @ts-ignore
  toast(res.data)
}

const onclickInsertSQL = async () => {
  const res = await insertTableData('lqlmysd', {
    sffl: 'yes',
  })
  // @ts-ignore
  toast(res.message)
}

const onclickDropTable = async () => {
  const res = await dropTable('lqlmysd')
  toast(res.message)
}

const onclickIsExist = async () => {
  const res = await isTableExist('lqlmysd')
  toast(res.data ? '存在' : '不存在')
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: auto;
}
</style>
