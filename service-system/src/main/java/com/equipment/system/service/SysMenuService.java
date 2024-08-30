package com.equipment.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.system.SysMenu;
import com.equipment.model.vo.AssignMenuVo;
import com.equipment.model.vo.RouterVo;

import java.util.List;

/**
* @author dylan
* @description 针对表【sys_menu(菜单表)】的数据库操作Service
* @createDate 2024-08-21 20:45:33
*/
public interface SysMenuService extends IService<SysMenu> {

    //菜单列表（树形）
    List<SysMenu> findNodes();

    boolean removeMenuById(String id);

    List<SysMenu> findSysMenuByRoleId(String roleId);

    boolean doAssign(AssignMenuVo assignMenuVo);

    List<RouterVo> getUserMenuList(String id);

    List<String> getUserButtonList(String id);
}
