<template>
  <tm-app color="white">
    <view class="container">
      <view class="chunk" v-for="(item, index) in columns" :key="index">
        <tm-text :font-size="35" :label="item.name"></tm-text>
        <tm-text color="red" :label="hintsMsg[index] || ''"></tm-text>
        <tm-input
          v-if="enterTab ?? false"
          :font-size="fontSize"
          :focus="!needDisable(item.prop) && currPosition === index"
          v-model="model[item.prop]"
          :type="item.numberOnly ? 'number' : 'text'"
          @confirm="toNext(index)"
          @blur="currPosition = -1"
          :disabled="needDisable(item.prop)"
        ></tm-input>
        <tm-input
          v-else
          :font-size="fontSize"
          :focus="!needDisable(item.prop) && currPosition === index"
          v-model="model[item.prop]"
          :type="item.numberOnly ? 'number' : 'text'"
          @blur="currPosition = -1"
          :disabled="needDisable(item.prop)"
        ></tm-input>
        <view class="overlap" @click="hdClick(index)"></view>
      </view>
      <PopupPicker
        ref="pickerInstance"
        :payload="currPayload!"
        :title="currTitle"
        @confirm="hdConfirm"
      ></PopupPicker>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { useVModel } from '@/utils/useVModel'
import PopupPicker from './popupPicker.vue'
import { ref } from 'vue'
import { useMainStore } from '@/store'
import { useCompRef } from '@/utils/common'
import { dateTag } from '@/utils/columnsHandler'
import { rulesMsg, rulesValid } from '@/utils/rules'
import { fontSize } from '@/utils/fontSizeHandler'

const props = defineProps<{
  columns: ColumnItem[]
  modelValue: ColumnForm
  enterTab: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: ColumnForm): void
}>()

const validate = () => {
  let res = true
  for (let i = 0; i < props.columns.length; i++) {
    const item = props.columns[i]
    if (!item.rules) continue
    for (const rule in item.rules) {
      if (
        !rulesValid[<keyof Rules>rule](
          item.rules[<keyof Rules>rule]!,
          model.value[item.prop]
        )
      ) {
        hintsMsg.value[i] = rulesMsg[<keyof Rules>rule]()
        res = false
        break
      } else {
        hintsMsg.value[i] = ''
      }
    }
  }
  return res
}
defineExpose({
  validate,
})

const mainStore = useMainStore()

const model = useVModel(props, 'modelValue', emit)

const currPosition = ref(-1)
const currPayload = ref<string[]>([''])
const currTitle = ref('')
const pickerInstance = useCompRef(PopupPicker)
const hintsMsg = ref<string[]>([])

let tmpPosition = -1

const getPropByIndex = (index: number) => {
  return props.columns[index].prop
}

const getPickerValueByIndex = (index: number) => {
  return props.columns[index].pickerValue
}

const getTitleByIndex = (index: number) => {
  return props.columns[index].name
}

const toNext = (i?: number) => {
  const next = (i ?? currPosition.value) + 1
  if (next >= props.columns.length) {
    currPosition.value = -1
    return
  }
  if (needPicker(next)) {
    setTimeout(() => {
      tmpPosition = next
      isQm(next) ? throwPicker(next, mainStore.getAllQl()) : throwPicker(next)
    }, 400)
  } else {
    setTimeout(() => {
      currPosition.value = next
    }, 100)
  }
}

const throwPicker = (index: number, payload?: string[]) => {
  currPayload.value = payload ?? getPickerValueByIndex(index)!
  currTitle.value = getTitleByIndex(index)
  pickerInstance.value?.show()
}

const needPicker = (index: number) => {
  return (
    isQm(index) ||
    (getPickerValueByIndex(index) !== void 0 &&
      getPickerValueByIndex(index)!.length > 0 &&
      (model.value[getPropByIndex(index)] === void 0 ||
        model.value[getPropByIndex(index)] === ''))
  )
}

const isQm = (index: number) => {
  return getPropByIndex(index) === 'qm' || getPropByIndex(index) === 'qlmc'
}

const needDisable = (prop: string) => {
  return dateTag.includes(prop)
}

const hdConfirm = (value: string) => {
  model.value[getPropByIndex(tmpPosition)] = value
  if (props.enterTab) {
    toNext(tmpPosition)
  }
}

const hdClick = (index: number) => {
  if (needPicker(index)) {
    tmpPosition = index
    isQm(index) ? throwPicker(index, mainStore.getAllQl()) : throwPicker(index)
  } else {
    setTimeout(() => {
      currPosition.value = index
    }, 100)
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 80rpx 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 40rpx;
  column-gap: 40rpx;
  .chunk {
    position: relative;
    .overlap {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 32px;
      @media screen and (max-width: 768px) {
        height: 64px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
