import request from '@/utils/request'

//常量
const api_name = '/admin/equipment/equipmentTransfer'


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
    saveEquipTransfer(equipTrans) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: equipTrans
        })
    },
    
    //4、根据id查询
    getEquipTransferId(id) {
        return request({
            url: `${api_name}/findEquipTransferById/${id}`,
            method: 'get'
        })
    },
    
    //5、修改方法
    update(equipTrans){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: equipTrans
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
