package com.equipment.system.mapper;

import com.equipment.model.system.SysUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
* @author dylan
* @description 针对表【sys_user(用户表)】的数据库操作Mapper
* @createDate 2024-08-18 17:38:41
* @Entity com.equip.system.domain.SysUser
*/
@Repository
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

}




