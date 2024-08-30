package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.system.SysRoleMenu;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author dylan
 * @description 针对表【sys_role_menu(角色权限表)】的数据库操作Mapper
 * @createDate 2024-08-18 17:38:41
 * @Entity com.equip.model.system.SysRoleMenu
 */

@Repository
@Mapper
public interface SysRoleMenuMapper extends BaseMapper<SysRoleMenu>{

}
