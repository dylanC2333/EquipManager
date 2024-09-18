import request from '@/utils/request'

//常量
const api_name = '/admin/equipment/equipmentMaintenance'


export default{

    //1、列表
    getPageList(page,limit,searchObj){
        return request({
            url: `${api_name}/${page}/${limit}`,
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
    saveEquipMain(equipMain) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: equipMain
        })
    },
    //4、根据id查询
    getEquipMainId(id) {
        return request({
            url: `${api_name}/findEquipMaintenanceById/${id}`,
            method: 'get'
        })
    },
    //5、修改方法
    update(equipMain){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: equipMain
        })
    },
    //6、批量删除
    batchRemove(idList) {
        return request({
          url: `${api_name}/batchRemove`,
          method: `delete`,
          data: idList
        })
    }
    
    
  
    
}
