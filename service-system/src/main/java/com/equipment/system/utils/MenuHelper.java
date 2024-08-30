package com.equipment.system.utils;

import com.equipment.model.system.SysMenu;

import java.util.ArrayList;
import java.util.List;

public class MenuHelper {

    // 构建树形

    /**
     * 使用递归方法构建菜单，方法入口
     * @param sysMenuList 所有节点列表
     * @return
     */
    public static List<SysMenu> bulidTree(List<SysMenu> sysMenuList) {
        List<SysMenu> sysMenuTree = new ArrayList<>();
        for (SysMenu sysMenu : sysMenuList) {
            if (sysMenu.getParentId() == 0) {
                sysMenuTree.add(findChildren(sysMenu,sysMenuList));
            }
        }
        return sysMenuTree;
    }

    /**
     * 递归查找子节点
     * @param sysMenu 父节点
     * @param sysMenuList 所有节点列表
     * @return
     */
    private static SysMenu findChildren(SysMenu sysMenu, List<SysMenu> sysMenuList) {
        sysMenu.setChildren(new ArrayList<SysMenu>());

        for (SysMenu it : sysMenuList) {
            if(Long.parseLong(sysMenu.getId()) == it.getParentId()) {
                sysMenu.getChildren().add(findChildren(it,sysMenuList));
            }
        }
        return sysMenu;
    }
}
