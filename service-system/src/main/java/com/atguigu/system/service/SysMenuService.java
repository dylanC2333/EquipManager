package com.atguigu.system.service;


import com.atguigu.model.system.SysMenu;
import com.atguigu.model.vo.AssginMenuVo;
import com.atguigu.model.vo.AssginRoleVo;
import com.atguigu.model.vo.RouterVo;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 菜单表 服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-22
 */
public interface SysMenuService extends IService<SysMenu> {

    List<SysMenu> findNodes();

    List<SysMenu> findMenuByRoleId(String roleId);

    void doAssign(AssginMenuVo assginMenuVo);

    void removeMenuById(String id);

    List<RouterVo> getUserMenuList(String id);

    List<String> getUserButtonList(String id);
}
