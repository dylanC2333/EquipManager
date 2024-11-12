import { useMainStore } from '@/store'
import { toFormatDate } from '@/utils/columnsHandler'
import { http } from '@/utils/request'

//常量
const api_name = '/admin/equipment/equipmentUse'

// const mainStore = useMainStore()

// export const handInOneRecord = (data: ColumnForm) => {
//   return http.post<number>('/jjg/fbgc/lmgc/lqlmysd/createOneRecord', data)
// }

// export const handInManyRecords = (data: ColumnForm[]) => {
//   return http.post<number>('/jjg/fbgc/lmgc/lqlmysd/createManyRecords', data)
// }

// export const getProjectDetail = () => {
//   return http.get('/project/getAllProject4App', {
//     auth: true,
//   })
// }

// export const getDataForm2Detail = () => {
//   const mainStore = useMainStore()
//   return http.get<ColumnForm>(mainStore.projInfo.detail + '/getDataForm4App')
// }

// export const handInManyRecords2Detail = (data: ColumnForm[]) => {
//   const mainStore = useMainStore()
//   const newData = <ColumnForm[]>JSON.parse(JSON.stringify(data))
//   newData.map((item) => toFormatDate(item))
//   return http.post<number>(
//     mainStore.projInfo.detail + '/createManyRecords',
//     newData,
//     {
//       auth: true,
//     }
//   )
// }

// export const getQlByStore = () => {
//   const mainStore = useMainStore()
//   const url = `/project/ql?proname=${mainStore.projInfo.proname}&htd=${mainStore.projInfo.htd}`
//   return http.get<string[]>(url, {
//     auth: true,
//   })
// }

// 0 获取所有记录
export const findAllRecords = () =>{
	const url = `${api_name}/findAll`
	return http.get(url, {} ,{
		auth: true,
	})
}
export const getPageList = (
	page: number,
	limit: number,
	searchObj: object,
	column: string,
	sortorder: string) =>{
	const url = `${api_name}/name/${page}/${limit}/${column}/${sortorder}`
	return http.get(url,searchObj,{
		auth: true,
	})
}
export const saveEquipUtilise = (equipUtilise: object) => {
	const url = `${api_name}/save`
	return http.post(url,equipUtilise,{
		auth: true,
	})
}
export const removeId = (id: number) => {
	const url = `${api_name}/remove/${id}`
	return http.delete(url,{},{
			auth: true,
	})
}