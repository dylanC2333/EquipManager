import request from '@/utils/request'

//常量
const api_name = '/admin/equipment/equipmentUse/'


export default{

    // 1 分页排序列表查询
    getPageList(page,limit,searchObj,column,sortorder){
        return request({
            url: `${api_name}/name/${page}/${limit}/${column}/${sortorder}`,
            method: 'get',
            params:searchObj
        })
    },

    //2、删除
    removeId(id) {
        return request({
          url: `${api_name}/remove/${id}`,
          method: 'delete'
        })
    },
    //3、添加
    saveEquipUse(equipUse) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: equipUse
        })
    },

    //4、根据id查询
    getEquipUseId(id) {
        return request({
            url: `${api_name}/findEquipUseById/${id}`,
            method: 'get'
        })
    },

    //5、修改方法
    update(equipUse){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: equipUse
        })
    },

    //6、批量删除
    batchRemove(idList) {
        return request({
          url: `${api_name}/batchRemove`,
          method: `delete`,
          data: idList
        })
    },

    //7、任务所使用设备查询列表
    taskDeviceFinder(page,limit,searchObj){
        return request({
            url: `${api_name}/taskDeviceFinder/${page}/${limit}`,
            method: 'get',
            params:searchObj
        })
    },

    //7、任务所参与人员查询列表
    taskUserFinder(page,limit,searchObj){
        return request({
            url: `${api_name}/taskUserFinder/${page}/${limit}`,
            method: 'get',
            params:searchObj
        })
    },

    //8、该设备在日期范围内的所有使用记录和总天数统计。（一次使用记录计一天）
    equipmentUsageDays(page,limit,searchObj){
        return request({
            url: `${api_name}/equipmentUsageDays/${page}/${limit}`,
            method: 'get',
            params:searchObj
        })
    },

    



}
