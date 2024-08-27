package com.equip.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equip.model.system.SysUser;
import com.equip.model.vo.RouterVo;
import com.equip.system.service.SysMenuService;
import com.equip.system.service.SysUserService;
import com.equip.system.mapper.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
* @author dylan
* @description 针对表【sys_user(用户表)】的数据库操作Service实现
* @createDate 2024-08-18 17:38:41
*/
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>
    implements SysUserService{

    @Autowired
    private SysMenuService sysMenuService;

    @Override
    public SysUser getUserInfoByUserName(String username) {
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        return baseMapper.selectOne(queryWrapper);
    }

    @Override
    public Map<String, Object> getUserInfo(String username) {
        //根据username查询用户基本信息
        SysUser user = getUserInfoByUserName(username);
        //根据username查询菜单权限
        List<RouterVo> routerVoList = sysMenuService.getUserMenuList(user.getId());
        //根据username查询按钮权限
        List<String> permsList = sysMenuService.getUserButtonList(user.getId());


        Map<String, Object> result = new HashMap<>();
        result.put("name", username);
        result.put("avatar","https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        result.put("roles","[admin]");
        //菜单权限数据
        result.put("routers",routerVoList);
        //按钮权限数据
        result.put("buttons",permsList);
        return result;
    }
}




