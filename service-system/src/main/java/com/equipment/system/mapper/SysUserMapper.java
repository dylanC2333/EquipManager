package com.equipment.system.mapper;

import com.equipment.model.system.SysUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author A
* @description 针对表【sys_user(用户表)】的数据库操作Mapper
* @createDate 2024-09-13 10:42:39
* @Entity com.equip.system.domain.SysUser
*/
public interface SysUserMapper extends BaseMapper<SysUser> {

    List<SysUser> getUserListByRoleName(@Param("roleName") String roleName);
}




