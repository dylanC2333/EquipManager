import request from '@/utils/request'
// 使用ES6中的模板字符串表示路径，简化代码。
const api_name = '/admin/system/sysRole/'

export default{
    // 分页查询
    getPageList(page,limit,searchObj){
        return request({
            // 接口路径
            url: `${api_name}${page}/${limit}`,
            // 提交方式
            method: 'get',
            // 参数
            params: searchObj
        })
    },
    // 删除
    removeId(id){
        return request({
            // 接口路径
            url: `${api_name}remove/${id}`,
            // 提交方式
            method: 'delete',
        })
    },
    // 添加角色
    saveRole(role){
        return request({
            // 接口路径
            url: `${api_name}save`,
            // 提交方式
            method: 'post',
            data: role
        })
    },
    // 根据id查询
    getRoleId(id){
        return request({
            // 接口路径
            url: `${api_name}get/${id}`,
            // 提交方式
            method: 'get',
        })
    },
    // 修改方法
    update(role){
        return request({
            // 接口路径
            url: `${api_name}update`,
            // 提交方式
            method: 'put',
            date: role
        })
    },
    //批量删除
    branchRemove(idList){
        return request({
            // 接口路径
            url: `${api_name}batchRemove`,
            // 提交方式
            method: 'delete',
            data: idList
        })
    },
    //根据用户id查询用户已分配的角色
    getRolesByUserId(userId) {
        return request({
        url: `${api_name}toAssign/${userId}`,
        method: 'get'
        })
    },
  
    //分配角色
    assignRoles(assginRoleVo) {
        return request({
        url: `${api_name}toAssign`,
        method: 'post',
        data: assginRoleVo
        })
    }
}