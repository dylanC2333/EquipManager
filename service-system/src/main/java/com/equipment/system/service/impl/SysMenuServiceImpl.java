package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.common.utils.RouterHelper;
import com.equipment.model.system.SysMenu;
import com.equipment.model.system.SysRoleMenu;
import com.equipment.model.system.SysUserRole;
import com.equipment.model.vo.AssignMenuVo;
import com.equipment.model.vo.RouterVo;
import com.equipment.system.exception.EquipException;
import com.equipment.system.mapper.SysMenuMapper;
import com.equipment.system.mapper.SysRoleMenuMapper;
import com.equipment.system.mapper.SysUserRoleMapper;
import com.equipment.system.service.SysMenuService;
import com.equipment.system.service.SysRoleMenuService;
import com.equipment.system.utils.MenuHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author A
* @description 针对表【sys_menu(菜单表)】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu>
    implements SysMenuService {

    @Autowired
    private SysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    private SysRoleMenuService sysRoleMenuService;

    @Autowired
    private SysMenuService sysMenuService;

    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;

    //菜单列表（树形）
    @Override
    public List<SysMenu> findNodes() {
        // 获取所有菜单
        List<SysMenu> sysMenuList = baseMapper.selectList(null);

        // 所有菜单数据转换为要求的数据格式
        List<SysMenu> resultList = MenuHelper.bulidTree(sysMenuList);
        return resultList;
    }

    //删除菜单
    @Override
    public boolean removeMenuById(String id) {
        //查询当前删除菜单是否存在子菜单
        // 根据id = parentid
        QueryWrapper<SysMenu> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("parent_id", id);
        Integer count = baseMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new EquipException(201,"请先删除子菜单");
        }
        baseMapper.deleteById(id);
        return true;
    }

    @Override
    public List<SysMenu> findSysMenuByRoleId(String roleId) {
        // 获取所有status==1 的权限列表
        List<SysMenu> sysMenuList = baseMapper.selectList(new QueryWrapper<SysMenu>().eq("status", 1));
        // 根据角色id获取角色权限，获取角色已分配的所有权限id
        List<SysRoleMenu> roleMenus = sysRoleMenuMapper.selectList(new QueryWrapper<SysRoleMenu>().eq("role_id",roleId));
        List<String> roleMenuIds = new ArrayList<>();
        for (SysRoleMenu roleMenu : roleMenus) {
            roleMenuIds.add(String.valueOf(roleMenu.getMenuId()));
        }
        //遍历所有权限列表
        for (SysMenu sysMenu : sysMenuList) {
            //设置该权限已被分配
            sysMenu.setSelect(roleMenuIds.contains(sysMenu.getId()));
        }
        //将权限列表转换为权限树，MenuHelper方法实现
        List<SysMenu> sysMenus = MenuHelper.bulidTree(sysMenuList);
        return sysMenus;
    }

    @Override
    public boolean doAssign(AssignMenuVo assignMenuVo) {
        //删除已分配的权限
        sysRoleMenuMapper.delete(new QueryWrapper<SysRoleMenu>().eq("role_id",assignMenuVo.getRoleId()));
        //遍历所有已选择的权限id,创建SysRoleMenu列表
        List<SysRoleMenu> roleMenuList = new ArrayList<>();
        for (String menuId: assignMenuVo.getMenuIdList()){
            SysRoleMenu roleMenu = new SysRoleMenu();
            roleMenu.setRoleId(Long.valueOf(assignMenuVo.getRoleId()));
            roleMenu.setMenuId(Long.valueOf(menuId));
            roleMenuList.add(roleMenu);
        }
        //批量插入
        return sysRoleMenuService.saveBatch(roleMenuList);
    }

    @Override
    public List<RouterVo> getUserMenuList(String userId) {
        // admin是超级管理员，操作所有内容，前期开发保留
        List<SysMenu> sysMenuList = null;
        //判断userid值为1。
        if("1".equals(userId)){
            QueryWrapper<SysMenu> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("status",1);
            queryWrapper.orderByAsc("sort_value");
            sysMenuList = baseMapper.selectList(queryWrapper);
        } else {
            //如果不是1，查询这个用户权限
            //不使用联表查询方法，采用分表查询
            sysMenuList = this.findMenuListUserId(userId);
        }

        // 构建树形结构
        List<SysMenu> sysMenuTreeList= MenuHelper.bulidTree(sysMenuList);
        // 转换成前端路由要求格式
        List<RouterVo> routerVos = RouterHelper.buildRouters(sysMenuTreeList);
        return routerVos;
    }

    @Override
    public List<String> getUserButtonList(String userId) {
        List<SysMenu> sysMenuList = null;
        //判断是否管理员
        if("1".equals(userId)){
            sysMenuList = baseMapper.selectList(new QueryWrapper<SysMenu>().eq("status",1));
        } else {
            sysMenuList = this.findMenuListUserId(userId);
        }
        // sysMenuList遍历得到按钮列表，条件type == 2
        List<String> permissionList = sysMenuList.stream()
                .filter(o -> o.getType() == 2)
                .map(SysMenu::getPerms)
                .collect(Collectors.toList());
        return permissionList;
    }

    //内部使用工具类,根据userId查询可用菜单列表menuList
    public List<SysMenu> findMenuListUserId(String userId){
        List<SysMenu> sysMenuList = null;
        List<SysUserRole> sysUserRoles = sysUserRoleMapper.selectList(new QueryWrapper<SysUserRole>().eq("user_id",userId));
        List<SysRoleMenu> sysRoleMenuList = new ArrayList<>();
        for (SysUserRole sysUserRole : sysUserRoles) {
            //查询出menuId需要去重，使用Stream流去重
            List<SysRoleMenu> roleMenus = sysRoleMenuService.list(new QueryWrapper<SysRoleMenu>().eq("role_id", sysUserRole.getRoleId()));
            sysRoleMenuList.addAll(roleMenus);
        }
        List<String> menuIdList = sysRoleMenuList.stream()
                .map(SysRoleMenu::getMenuId)
                .map(String::valueOf)
                .distinct()
                .collect(Collectors.toList());
        sysMenuList = baseMapper.selectList(new QueryWrapper<SysMenu>().in("id", menuIdList));
        return sysMenuList;
    };
}




