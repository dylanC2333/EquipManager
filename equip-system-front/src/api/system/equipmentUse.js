import request from '@/utils/request'

//常量
const api_name = '/admin/equipment/equipmentUse'


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
            url: `${api_name}/fingEquipUseById/${id}`,
            method: 'get'
        })
    },
    //5、修改方法
    update(equipUse){
        return request({
            url: `${api_name}/update`,
            method: 'post',
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
    }
    
    
  
    
}
