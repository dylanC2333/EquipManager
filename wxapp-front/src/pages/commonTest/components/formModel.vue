<template>
  <ContentModal :title="title" v-model:show="outputModel">
    <template #default>
      <DataForm
        :enter-tab="enterTab ?? false"
        v-model="model"
        :columns="columns"
      ></DataForm>
    </template>
    <template #button>
      <view v-if="addRecord" class="bottom-btns">
        <tm-button
          block
          text
          :margin="[0, 0]"
          :height="120"
          :round="-1"
          label="取消"
          @click="hdCancel"
        ></tm-button>
        <tm-button
          block
          :margin="[0, 0]"
          :height="120"
          :round="-1"
          label="完成"
          @click="hdConfirm"
        ></tm-button>
        <tm-button
          block
          :margin="[0, 0]"
          :height="120"
          :round="-1"
          label="新增"
          @click="hdAdd"
          color="#42b883"
        ></tm-button>
      </view>
      <view v-else class="bottom-btns">
        <tm-button
          block
          text
          :margin="[0, 0]"
          :height="100"
          :round="-1"
          label="取消"
          @click="hdCancel"
        ></tm-button>
        <tm-button
          block
          :margin="[0, 0]"
          :height="100"
          :round="-1"
          label="完成"
          @click="hdConfirm"
        ></tm-button>
      </view>
    </template>
  </ContentModal>
</template>

<script setup lang="ts">
import { useVModel } from '@/utils/useVModel'
import { computed } from 'vue'
import DataForm from './dataForm.vue'
import ContentModal from '@/components/contentModal.vue'

const props = defineProps<{
  output: boolean
  title: string
  modelValue: ColumnForm
  columns: ColumnItem[]
  /**
   * 是否显示新增按钮
   */
  addRecord?: boolean
  /**
   * 是否使用回车切换输入框
   */
  enterTab?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ColumnForm): void
  (e: 'update:output', value: boolean): void
  (e: 'cancel'): void
  (e: 'add'): void
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const model = useVModel(props, 'modelValue', emit)
const outputModel = computed({
  get() {
    return props.output
  },
  set(value) {
    emit('update:output', value)
  },
})

const gridStyle = props.addRecord ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'

const hdCancel = () => {
  outputModel.value = false
  emit('cancel')
}

const hdConfirm = () => {
  outputModel.value = false
  emit('confirm')
}

const hdAdd = () => {
  emit('add')
}

const hdClose = () => {
  outputModel.value = false
  emit('close')
}
</script>

<style scoped lang="scss">
.bottom-btns {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(gridStyle);
}
</style>
