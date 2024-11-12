import { ref } from 'vue'

export const throttle = <T extends (...args: any) => any>(
  func: T,
  duration: number,
  immediate: boolean = false
) => {
  if (immediate) {
    let t: number | undefined
    return (...args: Parameters<T>) => {
      if (!t || Date.now() - t > duration) {
        func(...(<any>args))
        t = Date.now()
      }
    }
  } else {
    let timer: any
    return (...args: Parameters<T>) => {
      if (!timer) {
        timer = setTimeout(() => {
          func(...(<any>args))
          timer = void 0
        }, duration)
      }
    }
  }
}

export const useCompRef = <T extends abstract new (...args: any) => any>(
  _: T
) => {
  return ref<InstanceType<T>>()
}
