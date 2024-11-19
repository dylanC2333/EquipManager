<template>
  <tm-app>
    <tm-text :label="txt"></tm-text>
  </tm-app>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store'
import { computed } from 'vue'

const mainStore = useMainStore()
const txt = computed(() => {
  if (mainStore.username) {
    return '当前用户：' + mainStore.username
  }
  return '未登录'
})
</script>

<style scoped></style>
