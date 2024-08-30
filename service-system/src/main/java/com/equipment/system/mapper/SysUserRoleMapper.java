package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.system.SysUserRole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SysUserRoleMapper extends BaseMapper<SysUserRole> {
}
