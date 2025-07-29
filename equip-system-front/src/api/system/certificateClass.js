import request from '@/utils/request'
// 使用ES6中的模板字符串表示路径，简化代码。
const api_name = '/admin/system/sysCertificateClasses/'

export default{
    // // 分页排序列表查询
    // getPageList(page,limit,searchObj,column,sortorder){
    //     return request({
    //         // 接口路径
    //         url: `${api_name}${page}/${limit}/${column}/${sortorder}`,
    //         // 提交方式
    //         method: 'get',
    //         // 参数
    //         params: searchObj
    //     })
    // },
    // 删除
    removeId(id){
        return request({
            // 接口路径
            url: `${api_name}remove/${id}`,
            // 提交方式
            method: 'delete',
        })
    },
    // 添加方法
    saveCertificateClass(certificateClass){
        return request({
            // 接口路径
            url: `${api_name}save`,
            // 提交方式
            method: 'post',
            data: certificateClass
        })
    },
    // 根据id查询
    getcertificateClassId(id){
        return request({
            // 接口路径
            url: `${api_name}get/${id}`,
            // 提交方式
            method: 'get',
        })
    },
    // 修改方法
    updateCertificateClass(certificateClass){
        return request({
            // 接口路径
            url: `${api_name}update`,
            // 提交方式
            method: 'put',
            data: certificateClass,
        })
    },
    // 查询所有
    getAllRecord(){
        return request({
            // 接口路径
            url: `${api_name}findAll`,
            // 提交方式
            method: 'get'
        })
    }
}