import { computed } from 'vue'

export const useVModel = <T extends Record<string, any>, U extends keyof T & string>(props: T, propName: U, emit: Function) => {
  return computed({
    get() {
      const proxy = new Proxy(props[propName], {
        get(target, key) {
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          emit('update:' + propName, {
            ...target,
            [key]: value,
          })
          return true
        },
      })
      return proxy
    },
    set(val) {
      emit('update:' + propName, val)
    },
  })
}
