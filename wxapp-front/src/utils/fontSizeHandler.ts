import { computed, ref } from 'vue'

let _isWide = ref(false)

export const isWide = computed(() => {
  uni.onWindowResize((res) => {
    _isWide.value = res.size.windowWidth > 768
  })
  return _isWide.value
})

export let startWide = false
export const setStartWide = (val: boolean) => {
  startWide = val
}

export const fontSize = computed(() => {
  let res = 0
  if (startWide) {
    res = isWide.value ? 30 : 60
  } else {
    res = isWide.value ? 15 : 30
  }
  return res
})
