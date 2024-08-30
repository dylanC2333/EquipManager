package com.equipment.system.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.system.SysUser;

import java.util.Map;

/**
* @author dylan
* @description 针对表【sys_user(用户表)】的数据库操作Service
* @createDate 2024-08-18 17:38:41
*/
public interface SysUserService extends IService<SysUser> {

    //username查询
    SysUser getUserInfoByUserName(String username);

    Map<String, Object> getUserInfo(String username);
}
