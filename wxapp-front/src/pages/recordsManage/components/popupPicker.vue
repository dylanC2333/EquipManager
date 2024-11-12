<template>
  <uni-popup ref="popup" type="bottom" @mask-click="selected[0] = 0">
    <div class="popup-view">
      <div class="popup-view-header">
        <div class="popup-view-1" @click="hdCancel">取消</div>
        <div class="popup-view-2">{{ title }}</div>
        <div class="popup-view-3" @click="hdConfirm">完成</div>
      </div>
      <picker-view
        v-if="visible"
        :indicator-style="indicatorStyle"
        :value="selected"
        class="picker-view"
        @change="hdChange($event.detail.value[0])"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in payload" :key="index">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </uni-popup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const popup = ref()

// not so good
defineExpose({
  show() {
    popup.value.open()
  },
  hide() {
    popup.value.close()
  },
})

const props = defineProps<{
  payload: string[]
  title: string
}>()

const selected = ref([0])

const b = computed(() => {
  return props.payload[selected.value[0]]
})

const visible = ref(true)
const indicatorStyle = ref(`height: 68rpx;`)

const emit = defineEmits<{
  (e: 'confirm', value: string): void
  (e: 'cancel'): void
}>()

const hdCancel = () => {
  emit('cancel')
  popup.value.close()
  selected.value = [0]
}

const hdChange = (i: number) => {
  selected.value[0] = i
}

const hdConfirm = () => {
  emit('confirm', b.value)
  popup.value.close()
  selected.value = [0]
}
</script>

<style scoped lang="scss">
.popup-view {
  background-color: #ffffff;
  .popup-view-header {
    text-align: center;
    width: 100%;
    height: 90rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    $header-item: #888888, #000, #007aff;
    @for $i from 1 through length($header-item) {
      .popup-view-#{$i} {
        @extend %popup-view;
        color: nth($list: $header-item, $n: $i);
      }
    }
    %popup-view {
      max-width: 33%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 28rpx;
      font-size: 34rpx;
      line-height: 90rpx;
    }
  }
  .picker-view {
    width: 100%;
    height: 476rpx;
    margin-top: 20rpx;
    .item {
      height: 68rpx !important;
      line-height: 68rpx;
      text-align: center;
      color: #000;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
