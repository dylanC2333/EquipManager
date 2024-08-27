package com.atguigu.system.mapper;

import com.atguigu.model.system.SysUser;
import com.atguigu.model.vo.SysEquipQueryVo;
import com.atguigu.model.vo.SysUserQueryVo;
import com.atguigu.system.entity.SysEquipment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
public interface SysEquipmentMapper extends BaseMapper<SysEquipment> {

    IPage<SysEquipment> selectPage(Page<SysEquipment> pageParam, @Param("vo") SysEquipQueryVo sysEquipQueryVo);
}
