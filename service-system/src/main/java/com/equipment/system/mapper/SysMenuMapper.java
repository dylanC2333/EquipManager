package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.system.SysMenu;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
* @author dylan
* @description 针对表【sys_menu(菜单表)】的数据库操作Mapper
* @createDate 2024-08-21 20:45:33
* @Entity com.equip.system.domain.SysMenu
*/
@Repository
@Mapper
public interface SysMenuMapper extends BaseMapper<SysMenu> {


    // 根据userid查询菜单权限数据
//    List<SysMenu> findMenuListUserId(@Param("userId") String userId);
}




