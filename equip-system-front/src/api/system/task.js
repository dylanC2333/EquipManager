import request from '@/utils/request'

//常量
const api_name = '/admin/system/sysTask/'


export default{

    // 1 分页排序列表查询
    getPageList(page,limit,searchObj,column,sortorder){
        return request({
            // 接口路径
            url: `${api_name}${page}/${limit}/${column}/${sortorder}`,
            //提交方式
            method: 'get',
            //参数
            params: searchObj
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
    saveTask(task) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: task
        })
    },
    //4、根据id查询
    getTaskId(id) {
        return request({
            url: `${api_name}/findTaskById/${id}`,
            method: 'get'
        })
    },
    //5、修改方法
    update(task){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: task
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
