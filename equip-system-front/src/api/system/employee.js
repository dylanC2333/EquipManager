import request from '@/utils/request'

const api_name = '/admin/system/employee/'
export default{
    // 分页排序查询员工
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
    // 根据id删除
    removeId(id){
        return request({
            // 接口路径
            url: `${api_name}remove/${id}`,
            // 提交方式
            method: 'delete',
        })
    },
    // 添加员工
    saveEmployee(employee) {
        return request({
          url: `${api_name}save`,
          method: 'post',
          data: employee
        })
    },
    // 根据id查询
    getEmployeeId(id){
        return request({
            // 接口路径
            url: `${api_name}get/${id}`,
            // 提交方式
            method: 'get',
        })
    },
    // 修改方法
    update(employee){
        return request({
            // 接口路径
            url: `${api_name}update`,
            // 提交方式
            method: 'put',
            data: employee
        })
    },
    // 批量删除
    batchRemove(idList) {
        return request({
          url: `${api_name}batchRemove`,
          method: `delete`,
          data: idList
        })
    },
}
