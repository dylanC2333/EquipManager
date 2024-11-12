type Icon = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'

interface ToastFunc {
  (t: string): void
  (t: string, icon: Icon): void
  (t: string, icon: Icon, duration: number): void
}

export const toast: ToastFunc = (t: string, icon?: Icon, duration?: number) => {
  uni.showToast({
    title: t,
    icon: icon ?? 'none',
    duration: duration ?? 1500
  })
}
