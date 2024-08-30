import request from '@/utils/request'

//常量
const api_name = '/admin/system/sysEquip'


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
    saveEquip(equip) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: equip
        })
    },
    //4、根据id查询
    getEquipId(id) {
        return request({
            url: `${api_name}/fingEquipById/${id}`,
            method: 'get'
        })
    },
    //5、修改方法
    update(equip){
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: equip
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
