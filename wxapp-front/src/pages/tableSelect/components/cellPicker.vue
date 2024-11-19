<template>
    <tm-cell
      bottomBorder
      color="#f5f5f5"
      title-color="#1a1a1a"
      :margin="[0, 0]"
      :titleFontSize="40"
      :title="title"
    >
      <template #right>
        <picker
          mode="selector"
          :range="dataset"
          range-key="text"
          @change="hdChange"
        >
          <view class="right-side">{{ model || '请选择' }}</view>
        </picker>
      </template>
    </tm-cell>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dataset: PickerColumn[]
  title: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const hdChange = (e: any) => {
  model.value = props.dataset[e.detail.value].text
}
</script>

<style scoped lang="scss">
.right-side {
  text-align: right;
  width: 80vw;
  color: #404040;
}
</style>
