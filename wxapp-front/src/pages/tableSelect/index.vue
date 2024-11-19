<template>
  <tm-app color="#ffffff">
    <view class="container">
      <view class="main">
        <view class="cells">
          <CellPicker
            :dataset="projPicker"
            title="项目名称"
            v-model="proname"
          ></CellPicker>
          <CellPicker
            :dataset="contractsPicker"
            title="合同段"
            v-model="htd"
          ></CellPicker>
          <CellPicker
            :dataset="typePicker"
            title="工程类型"
            v-model="fbgc"
          ></CellPicker>
        </view>
        <view class="btn-container">
          <view class="btns">
            <view class="btn" v-for="(item, index) in sheetsBtns" :key="index">
              <tm-button
                :label="item.title"
                color="#25b1bf"
                font-color="#fff"
                :font-size="35"
                @click="hdClick(item.title)"
                :height="100"
                block
              ></tm-button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import CellPicker from './components/cellPicker.vue'
import { useMainStore } from '@/store'
import { getCurRecordPath, getSheetsByFBGC } from '@/utils/sheets'
import { getQlByStore } from "@/api/receive"
import { watch } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

const mainStore = useMainStore()

const proname = ref('')
const htd = ref('')
const fbgc = ref('')

const projNames = mainStore.getAllProjName()
const projPicker = projNames.reduce((p, c, i) => {
  p.push({
    text: c,
    id: i,
  })
  return p
}, <PickerColumn[]>[])

const contractsPicker = computed(() => {
  const contract = mainStore.getContractsNameByProjName(proname.value)
  return contract.reduce((p, c, i) => {
    p.push({
      text: c,
      id: i,
    })
    return p
  }, <PickerColumn[]>[])
})

const typePicker = computed(() => {
  const tp = mainStore.getTypeByProjNameAndContractName(
    proname.value,
    htd.value
  )
  return tp.reduce((p, c, i) => {
    p.push({
      text: c,
      id: i,
    })
    return p
  }, <PickerColumn[]>[])
})

const sheetsBtns = computed(() => {
  return getSheetsByFBGC(fbgc.value)
})

watch(contractsPicker, () => {
  htd.value = ''
  fbgc.value = ''
})

watch(typePicker, () => {
  fbgc.value = ''
})

const hdClick = async (title: string) => {
  mainStore.projInfo.proname = proname.value
  mainStore.projInfo.htd = htd.value
  mainStore.projInfo.fbgc = fbgc.value
  mainStore.projInfo.type = title
  mainStore.projInfo.detail = getCurRecordPath()
  const ql = await getQlByStore()
  mainStore.assignQl(ql)
  uni.navigateTo({
    url: '/pages/recordsManage/index',
  })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  .main {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    .cells {
      margin: 20rpx auto;
      width: 94%;
      border-radius: 14rpx;
      border: 1px solid #dfdfdf;
      overflow: hidden;
      .right-side {
        text-align: right;
        width: 80vw;
        color: #404040;
      }
    }
    .btn-container {
      width: 94%;
      height: 60vh;
      margin-left: 3%;
      flex-grow: 0.95;
      border-radius: 14rpx;
      background: #f5f5f5;
      box-shadow: inset 0px 4px 9px -3px rgba(0, 0, 0, 0.1);
      overflow: scroll;
      .btns {
        margin-top: 40rpx;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        align-items: center;
        column-gap: 16rpx;
        row-gap: 24rpx;
        .btn {
          width: 90%;
        }
      }
      @media screen and (max-width: 768px) {
        .btns {
          grid-template-columns: 1fr;
          column-gap: 0;
        }
      }
    }
  }
}
</style>
