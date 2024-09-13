package com.equipment.system.service;

import com.equipment.model.system.SysRole;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.AssignRoleVo;

import java.util.Map;

/**
* @author A
* @description 针对表【sys_role(角色)】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysRoleService extends IService<SysRole> {

    Map<String, Object> getRolesByUserId(String userId);

    void doAssign(AssignRoleVo assignRoleVo);
}
