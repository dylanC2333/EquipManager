<template>
  <tm-app>
    <view class="table">
      <tm-table
        :table-data="data"
        :width="4000"
        :height="1000"
        :header-height="100"
        :cell-height="100"
        stripe
        @row-click="hdClick"
      ></tm-table>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: TableDataType
}>()

const emit = defineEmits<{
  (e: 'update', index: number): void
  (e: 'delete', index: number): void
}>()


const hdClick = (row: number, col: number) => {
  if (col === 0) {
    emit('update', row)
  } else if (col === 1) {
    emit('delete', row)
  }
}


</script>

<style scoped lang="scss">
.table {
  display: flex;
  justify-content: center;
}
</style>
