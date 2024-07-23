package com.atguigu.system.service.impl;

import com.atguigu.model.system.SysMenu;
import com.atguigu.model.system.SysRoleMenu;
import com.atguigu.model.vo.AssginMenuVo;
import com.atguigu.model.vo.AssginRoleVo;
import com.atguigu.model.vo.RouterVo;
import com.atguigu.system.exception.GuiguException;
import com.atguigu.system.mapper.SysMenuMapper;
import com.atguigu.system.mapper.SysRoleMenuMapper;
import com.atguigu.system.service.SysMenuService;
import com.atguigu.system.utils.RouterHelper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atguigu.system.utils.MenuHelper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-22
 */
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

    @Autowired
    private SysRoleMenuMapper sysRoleMenuMapper;

    //菜单列表（树形结构）
    @Override
    public List<SysMenu> findNodes() {
        List<SysMenu> sysMenuList = baseMapper.selectList(null);
        List<SysMenu> resultList = MenuHelper.buildTree(sysMenuList);
        return resultList;
    }

    @Override
    public List<SysMenu> findMenuByRoleId(String roleId) {
        //获取所有菜单 status = 1
        QueryWrapper<SysMenu>  wrapperMenu = new QueryWrapper<>();
        wrapperMenu.eq("status", 1);
        List<SysMenu> menuList = baseMapper.selectList(wrapperMenu);

        //根据角色id查询 角色分配过的菜单列表
        QueryWrapper<SysRoleMenu> wrapperRoleMenu = new QueryWrapper<>();
        wrapperRoleMenu.eq("role_id", roleId);
        List<SysRoleMenu> roleMenus = sysRoleMenuMapper.selectList(wrapperRoleMenu);

        //从第二步查询列表中，获取角色分配所有菜单id
        List<String> roleMneuIds = new ArrayList<>();
        for (SysRoleMenu sysRoleMenu : roleMenus) {
            String menuId = sysRoleMenu.getMenuId();
            roleMneuIds.add(menuId);
        }

        //数据处理：isSelect 如果菜单选中 true，否则 false
        //拿着分配菜单id 和 所有菜单对比，有相同的，让isSelect值为true
        for(SysMenu sysMenu : menuList){
            if(roleMneuIds.contains(sysMenu.getId())){
                sysMenu.setSelect(true);
            }else{
                sysMenu.setSelect(false);
            }
        }

        //转换为树形结构
        List<SysMenu> sysMenus = MenuHelper.buildTree(menuList);
        return sysMenus;
    }

    //给角色分配权限
    @Override
    public void doAssign(AssginMenuVo assginMenuVo) {
        QueryWrapper<SysRoleMenu> wrapper = new QueryWrapper<>();
        wrapper.eq("role_id",assginMenuVo.getRoleId());
        //根据角色id 删除菜单权限
        sysRoleMenuMapper.delete(wrapper);
        //遍历菜单id列表，一个一个添加
        List<String> menuIdList = assginMenuVo.getMenuIdList();
        for(String menuId : menuIdList){
            SysRoleMenu sysRoleMenu = new SysRoleMenu();
            sysRoleMenu.setMenuId(menuId);
            sysRoleMenu.setRoleId(assginMenuVo.getRoleId());
            sysRoleMenuMapper.insert(sysRoleMenu);
        }
    }

    @Override
    public void removeMenuById(String id) {
        //查询当前删除菜单下面是否有子菜单
        //根据id = parentid
        QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
        wrapper.eq("parent_id", id);
        Integer count = baseMapper.selectCount(wrapper);
        if(count > 0){
            throw new GuiguException(201,"请先删除子菜单");
        }
        //调用方法删除
        baseMapper.deleteById(id);
    }

    @Override
    public List<RouterVo> getUserMenuList(String userId) {
       //admin是超级管理员，操作所有内容
        List<SysMenu> sysMenuList = null;
       //如果userid值是1代表超级管理员，查询所有权限数据
        if("1".equals(userId)){
            QueryWrapper<SysMenu> wrapper = new QueryWrapper<>();
            wrapper.eq("status", 1);
            wrapper.orderByAsc("sort_value");
            sysMenuList = baseMapper.selectList(wrapper);
        }else{
            //如果userid不是1，其他类型用户，查询这个用户权限
            sysMenuList = baseMapper.findMenuListUserId(userId);
        }
        //构建树形结构
        List<SysMenu> sysMenuTreeList = MenuHelper.buildTree(sysMenuList);
        //转换成前端路由要求格式
        List<RouterVo> routerVoList = RouterHelper.buildRouters(sysMenuTreeList);
        return routerVoList;
    }

    @Override
    public List<String> getUserButtonList(String userId) {
        List<SysMenu> sysMenuList = null;
        //如果userid值是1代表超级管理员，查询所有权限数据
        if("1".equals(userId)){
            sysMenuList = baseMapper.selectList(new QueryWrapper<SysMenu>().eq("status", 1));
        }else{
            //如果userid不是1，其他类型用户，查询这个用户权限
            sysMenuList = baseMapper.findMenuListUserId(userId);
        }
        List<String> permissionlist = new ArrayList<>();
        for(SysMenu sysMenu : sysMenuList){
            if(sysMenu.getType() == 2){
                String perms = sysMenu.getPerms();
                permissionlist.add(perms);
            }
        }
        return permissionlist;
    }
}
