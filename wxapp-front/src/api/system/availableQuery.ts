import { http } from '@/utils/request'

//常量
const sysuser_api = '/admin/system/sysUser'
const stock_api = '/admin/equipment/equipmentStock'

//查询空闲检测人员名单
export const getAvailableInspectionStaffList = (
	page: number,
	limit: number,
	searchObj: object) => {
	const url = `${sysuser_api}/detectionEmployees/${page}/${limit}`
	return http.get(url, searchObj,{
		auth: true,
	})
}

//查询空闲设备名单，在库设备
export const equipmentFinder = (
	page: number,
	limit: number,
	searchObj: object) => {
	const url = `${stock_api}/idleEquipmentFinder/${page}/${limit}`
	return http.get(url, searchObj, {
		auth: true,
	})
}

//查询空闲设备名单，出库设备且任务地在搜索条件内,无使用记录
export const equipmentFinder2 = (
	page: number,
	limit: number,
	searchObj: object) => {
	const url = `${stock_api}/idleEquipmentFinder2/${page}/${limit}`
	return http.get(url, searchObj, {
		auth: true,
	})
}
