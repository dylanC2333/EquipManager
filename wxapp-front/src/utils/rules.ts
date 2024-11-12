export const rulesMsg: Record<keyof Rules, (s?: string) => string> = {
  notNull(s) {
    return s ?? '输入内容不能为空'
  },
}

export const rulesValid: {
  [K in keyof Rules]: (constraint: Rules[K], content: string) => boolean
} = {
  notNull(constraint, content) {
    return !constraint || !!content
  },
}
