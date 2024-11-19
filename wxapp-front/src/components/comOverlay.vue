<template>
  <view v-if="showMask">
    <view
      :class="['mask', 'overlap', fadeFlag ? 'fade-in' : 'fade-out']"
      :style="{
        transitionDuration: duration + 'ms',
      }"
    ></view>
    <view
      :class="['close-area', fadeFlag ? 'fade-in' : 'fade-out']"
      :style="{
        transitionDuration: duration + 'ms',
      }"
      @click.stop="hdClose"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { throttle } from '@/utils/common'
import { watch } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:show', val: boolean): void
}>()

const fadeFlag = ref(false)
const showMask = ref(false)
const duration = 250

watch(
  () => props.show,
  (val) => {
    openOrClose(val)
  }
)

onMounted(() => {
  if (props.show) {
    openOrClose(true)
  }
})

const hdClose = (e: Event) => {
  e.stopPropagation()
  openOrClose(false)
}

const switchStatus = (status: boolean) => {
  if (status) {
    showMask.value = true
    setTimeout(() => {
      fadeFlag.value = true
    }, 15)
    setTimeout(() => {
      emit('update:show', true)
    }, duration)
  } else {
    fadeFlag.value = false
    setTimeout(() => {
      showMask.value = false
      emit('close')
      emit('update:show', false)
    }, duration + 15)
  }
}

const throttleSwitchStatus = throttle(switchStatus, duration + 15, true)
const openOrClose = (val: boolean) => {
  if (showMask.value === val) return
  throttleSwitchStatus(val)
}
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.overlap {
  transition-timing-function: ease;
  transition-property: opacity;
  transition-delay: 0;
  opacity: 0;
}
.close-area {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.fade-in {
  opacity: 1;
}
.fade-out {
  opacity: 0;
}
</style>
