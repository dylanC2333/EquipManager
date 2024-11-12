<template>
  <ComOverlay v-model:show="showModel" @close="hdClose">
    <view class="border" @click.stop="$event.stopPropagation()">
      <view class="title">
        <h1>{{ props.title }}</h1>
      </view>
      <view class="content">
        <slot name="default"></slot>
      </view>
      <view class="button">
        <slot name="button"></slot>
      </view>
    </view>
  </ComOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ComOverlay from './comOverlay.vue'

const props = defineProps<{
  show: boolean
  title: string
  portraitSize?: {
    width: string
    height: string
  }
  landscapeSize?: {
    width: string
    height: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'close'): void
}>()

const showModel = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  },
})

const hdClose = () => {
  emit('close')
}

const lw = props.landscapeSize?.width || '1000px'
const lh = props.landscapeSize?.height || '500px'
const pw = props.portraitSize?.width || '90%'
const ph = props.portraitSize?.height || '80%'
</script>

<style scoped lang="scss">
.border {
  width: v-bind(lw);
  height: v-bind(lh);
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .title {
    padding: 10px;
    text-align: center;
    background: #f5f5f5d0;
    h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .content {
    margin: auto 15px;
    overflow: scroll;
  }
  @media screen and (max-width: 768px) {
    width: v-bind(pw);
    height: v-bind(ph);
  }
}
</style>
