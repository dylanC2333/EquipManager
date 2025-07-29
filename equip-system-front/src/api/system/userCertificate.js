import request from '@/utils/request'
// 使用ES6中的模板字符串表示路径，简化代码。
const api_name = '/admin/system/sysCertificateClasses/user-certificates/'

export default{
    
    //删除
    removeId(id){
        return request({
            // 接口路径
            url: `${api_name}remove/${id}`,
            // 提交方式
            method: 'delete',
        })
    },
    // 添加方法
    saveUserCertificate(userCertificate){
        return request({
            // 接口路径
            url: `${api_name}save`,
            // 提交方式
            method: 'post',
            data: userCertificate
        })
    },
    // 根据id查询
    getUserCertificateById(id){
        return request({
            // 接口路径
            url: `${api_name}get/${id}`,
            // 提交方式
            method: 'get',
        })
    },
    // 修改方法
    updateUserCertificate(userCertificate){
        return request({
            // 接口路径
            url: `${api_name}update`,
            // 提交方式
            method: 'put',
            data: userCertificate,
        })
    },
    // 查询所有
    getAllRecord(userid){
        return request({
            // 接口路径
            url: `${api_name}findAll/${userid}`,
            // 提交方式
            method: 'get'
        })
    }
}