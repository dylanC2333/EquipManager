package com.equipment.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysUser;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.SysDetectionEmployeeQueryVo;

import java.util.List;
import java.util.Map;

/**
* @author A
* @description 针对表【sys_user(用户表)】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysUserService extends IService<SysUser> {
    SysUser getUserInfoByUserCode(String userCode);

    Map<String, Object> getUserInfo(String userCode);

    List<SysUser> getUserListByRoleName(String roleName);

    IPage<SysUser> idleEmployeesFinder(Page<SysUser> pageParam, SysDetectionEmployeeQueryVo sysDetectionEmployeeQueryVo);
}
