<template>
  <tm-app color="white">
    <view class="container">
      <view v-for="(item, index) in columns" :key="index">
        <tm-text :font-size="35" :label="item.name"></tm-text>
        <tm-input
          v-if="enterTab ?? false"
          :focus="currPosition === index"
          @focus="currPosition = index"
          v-model="model[item.prop]"
          @confirm="toNext"
        ></tm-input>
        <tm-input
          v-else
          v-model="model[item.prop]"
        ></tm-input>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { useVModel } from '@/utils/useVModel'
import { ref } from 'vue'

const props = defineProps<{
  columns: ColumnItem[]
  modelValue: ColumnForm
  enterTab: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ColumnForm): void
}>()

const currPosition = ref(-1)

const toNext = () => {
  setTimeout(() => {
    currPosition.value++
  }, 100)
}

// 防止破坏单向数据流
const model = useVModel(props, 'modelValue', emit)
</script>

<style scoped lang="scss">
.container {
  margin: 80rpx 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 40rpx;
  column-gap: 40rpx;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
