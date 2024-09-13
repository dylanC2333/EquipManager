package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysRole;
import com.equipment.model.system.SysUserRole;
import com.equipment.model.vo.AssignRoleVo;
import com.equipment.model.vo.SysRoleQueryVo;
import com.equipment.system.mapper.SysRoleMapper;
import com.equipment.system.mapper.SysUserRoleMapper;
import com.equipment.system.service.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;

    @Override
    public Map<String, Object> getRolesByUserId(String userId) {
        // 获取所有角色
        List<SysRole> roles = baseMapper.selectList(null);
        // 根据用户id查询
        QueryWrapper<SysUserRole> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        // 获取用户已经分配角色
        List<SysUserRole> userRolesList = sysUserRoleMapper.selectList(queryWrapper);
        List<String> userRoleIds = new ArrayList<>();
        // 获取用户已分配的角色id
        for (SysUserRole sysUserRole : userRolesList) {
            userRoleIds.add(String.valueOf(sysUserRole.getRoleId()));
        }
        // 创建返回的Map
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("allRoles", roles);
        returnMap.put("userRoleIds", userRoleIds);
        return returnMap;
    }

    @Override
    public void doAssign(AssignRoleVo assignRoleVo) {
        // 根据用户id删除原来分配的角色
        QueryWrapper<SysUserRole> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", assignRoleVo.getUserId());
        sysUserRoleMapper.delete(queryWrapper);
        // 获取所有的角色id
        List<String> roleIdList = assignRoleVo.getRoleIdList();
        for (String roleId : roleIdList) {
            if(roleId != null){
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setUserId(Long.valueOf(assignRoleVo.getUserId()));
                sysUserRole.setRoleId(Long.valueOf(roleId));
                //保存
                sysUserRoleMapper.insert(sysUserRole);
            }
        }


    }


}
