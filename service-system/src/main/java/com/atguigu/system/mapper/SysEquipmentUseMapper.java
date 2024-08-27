package com.atguigu.system.mapper;

import com.atguigu.model.vo.SysEquipmentIntakeQueryVo;
import com.atguigu.model.vo.SysEquipmentUseQueryVo;
import com.atguigu.system.entity.SysEquipmentIntake;
import com.atguigu.system.entity.SysEquipmentUse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author atguigu
 * @since 2024-08-01
 */
public interface SysEquipmentUseMapper extends BaseMapper<SysEquipmentUse> {
    IPage<SysEquipmentUse> selectPage(Page<SysEquipmentUse> pageParam, @Param("vo") SysEquipmentUseQueryVo sysEquipmentUseQueryVo);
}
