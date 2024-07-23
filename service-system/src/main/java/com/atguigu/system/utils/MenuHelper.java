package com.atguigu.system.utils;

import com.atguigu.model.system.SysMenu;

import java.util.ArrayList;
import java.util.List;

public class MenuHelper {


    public static List<SysMenu> buildTree(List<SysMenu> sysMenuList) {
        List<SysMenu> treeList = new ArrayList<SysMenu>();
        for (SysMenu sysMenu : sysMenuList) {
            if (sysMenu.getParentId().longValue() == 0) {
                treeList.add(findChildren(sysMenu,sysMenuList));
            }
        }
        return treeList;
    }

    private static SysMenu findChildren(SysMenu sysMenu, List<SysMenu> treeNodes) {
        sysMenu.setChildren(new ArrayList<SysMenu>());
        for (SysMenu it :treeNodes) {
            //String id = sysMenu.getId();
            //long cid = Long.parseLong(id);
            //Long parentId = it.getParentId();
            if (it.getParentId() == Long.parseLong(sysMenu.getId())) {
                if(sysMenu.getChildren()==null){
                    sysMenu.setChildren(new ArrayList<>());
                }
                sysMenu.getChildren().add(findChildren(it,treeNodes));
            }
        }
        return sysMenu;
    }
}
