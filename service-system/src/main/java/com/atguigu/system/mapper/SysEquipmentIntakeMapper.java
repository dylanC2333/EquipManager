package com.atguigu.system.mapper;

import com.atguigu.model.vo.SysEquipmentExportQueryVo;
import com.atguigu.model.vo.SysEquipmentIntakeQueryVo;
import com.atguigu.system.entity.SysEquipmentExport;
import com.atguigu.system.entity.SysEquipmentIntake;
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
public interface SysEquipmentIntakeMapper extends BaseMapper<SysEquipmentIntake> {
    IPage<SysEquipmentIntake> selectPage(Page<SysEquipmentIntake> pageParam, @Param("vo") SysEquipmentIntakeQueryVo sysEquipmentIntakeQueryVo);
}
