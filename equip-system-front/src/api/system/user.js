import request from '@/utils/request'
// 使用ES6中的模板字符串表示路径，简化代码。
const api_name = '/admin/system/sysUser/'

export default{
    // 分页排序列表查询
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
    // 添加
    save(user){
        return request({
            // 接口路径
            url: `${api_name}save`,
            //提交方式
            method: 'post',
            //参数
            data: user
        })
    },
    // 根据id查询
    getUserId(id){
        return request({
            // 接口路径
            url: `${api_name}get/${id}`,
            // 提交方式
            method: 'get',
        })
    },
    // 修改
    update(user){
        return request({
            // 接口路径
            url: `${api_name}update`,
            // 提交方式
            method: 'put',
            data: user
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

    // 根据字段信息查询用户
    getUserQuery(roleName){
        return request({
            // 接口路径
            url: `${api_name}query/${roleName}`,
            // 提交方式
            method: 'get',
        })
    },
    //查询空闲检测人员名单
    getAvailableInspectionStaffList(page,limit,searchObj){
        return request({
            url: `${api_name}/detectionEmployees/${page}/${limit}`,
            method: 'get',
            params:searchObj
        })
    },

    //修改密码
    passwordChange(user){
        return request({
            // 接口路径
            url: `${api_name}passwordChange`,
            // 提交方式
            method: 'put',
            data: user
        })
    },
}
