package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysUser;
import com.equipment.model.vo.RouterVo;
import com.equipment.model.vo.SysDetectionEmployeeQueryVo;
import com.equipment.system.mapper.SysUserMapper;
import com.equipment.system.service.SysMenuService;
import com.equipment.system.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* @author A
* @description 针对表【sys_user(用户表)】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>
    implements SysUserService {

    @Autowired
    private SysMenuService sysMenuService;

    @Autowired
    private SysUserMapper sysUserMapper;


    @Override
    public SysUser getUserInfoByUserCode(String userCode) {
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_code", userCode);
        return baseMapper.selectOne(queryWrapper);
    }

    @Override
    public Map<String, Object> getUserInfo(String userCode) {
        //根据username查询用户基本信息
        SysUser user = getUserInfoByUserCode(userCode);
        //根据username查询菜单权限
        List<RouterVo> routerVoList = sysMenuService.getUserMenuList(user.getId());
        //根据username查询按钮权限
        List<String> permsList = sysMenuService.getUserButtonList(user.getId());


        Map<String, Object> result = new HashMap<>();
        result.put("name", userCode);
        result.put("avatar","https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        result.put("roles","[admin]");
        //菜单权限数据
        result.put("routers",routerVoList);
        //按钮权限数据
        result.put("buttons",permsList);
        return result;
    }

    @Override
    public List<SysUser> getUserListByRoleName(String roleName) {
        List<SysUser> sysUserList = null;
        sysUserList = sysUserMapper.getUserListByRoleName(roleName);
        return sysUserList;
    }

    public IPage<SysUser> idleEmployeesFinder(Page<SysUser> pageParam, SysDetectionEmployeeQueryVo sysDetectionEmployeeQueryVo) {
        return baseMapper.idleEmployees(pageParam,sysDetectionEmployeeQueryVo);
    }

}




