export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const formatReadableDate = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export const readableToFormat = (date: string) => {
  return date.replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, ' ') + '00:00:00'
}