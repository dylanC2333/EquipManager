import { useMainStore } from '@/store'
import { toFormatDate } from '@/utils/columnsHandler'
import { http } from '@/utils/request'

// const mainStore = useMainStore()

// export const handInOneRecord = (data: ColumnForm) => {
//   return http.post<number>('/jjg/fbgc/lmgc/lqlmysd/createOneRecord', data)
// }

// export const handInManyRecords = (data: ColumnForm[]) => {
//   return http.post<number>('/jjg/fbgc/lmgc/lqlmysd/createManyRecords', data)
// }

export const getProjectDetail = () => {
  return http.get('/project/getAllProject4App', {
    auth: true,
  })
}

export const getDataForm2Detail = () => {
  const mainStore = useMainStore()
  return http.get<ColumnForm>(mainStore.projInfo.detail + '/getDataForm4App')
}

export const handInManyRecords2Detail = (data: ColumnForm[]) => {
  const mainStore = useMainStore()
  const newData = <ColumnForm[]>JSON.parse(JSON.stringify(data))
  newData.map((item) => toFormatDate(item))
  return http.post<number>(
    mainStore.projInfo.detail + '/createManyRecords',
    newData,
    {
      auth: true,
    }
  )
}

export const getQlByStore = () => {
  const mainStore = useMainStore()
  const url = `/project/ql?proname=${mainStore.projInfo.proname}&htd=${mainStore.projInfo.htd}`
  return http.get<string[]>(url, {
    auth: true,
  })
}
