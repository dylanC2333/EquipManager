<template>
  <ContentModal
    v-model:show="showModel"
    :title="title"
    :landscape-size="{
      width: '300px',
      height: '200px',
    }"
    :portrait-size="{
      width: '400px',
      height: '300px',
    }"
    center
  >
    <template #default>
      <view class="content">{{ content }}</view>
    </template>
    <template #button>
      <view class="bottom-btns">
        <tm-button
          block
          text
          :margin="[0, 0]"
          :height="100"
          :round="-1"
          label="取消"
          @click="showModel = false"
        ></tm-button>
        <tm-button
          block
          :margin="[0, 0]"
          :height="100"
          :round="-1"
          label="确认"
          :color="checkColor"
          @click="hdCheck"
        ></tm-button>
      </view>
    </template>
  </ContentModal>
</template>

<script setup lang="ts">
import ContentModal from '@/components/contentModal.vue'
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  checkColor?: string
  content: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'check'): void
}>()

const showModel = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const hdCheck = () => {
  showModel.value = false
  emit('check')
}
</script>

<style scoped lang="scss">
.bottom-btns {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.content {
  text-align: center;
}
</style>
