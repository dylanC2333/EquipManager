package com.equip.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equip.model.system.SysRole;
import com.equip.model.vo.AssignRoleVo;
import com.equip.model.vo.SysRoleQueryVo;

import java.util.Map;

public interface SysRoleService extends IService<SysRole> {
    // 3 条件分页查询
    IPage<SysRole> selectPage(Page<SysRole> pageParam, SysRoleQueryVo sysRoleQueryVo);

    // 获取用户的角色数据
    Map<String, Object> getRolesByUserId(String userId);

    void doAssign(AssignRoleVo assignRoleVo);
}
