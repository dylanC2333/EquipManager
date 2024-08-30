package com.equipment.system.mapper;

import com.equipment.model.vo.SysEquipmentDetectionQueryVo;
import com.equipment.model.vo.SysEquipmentExportQueryVo;
import com.equipment.model.system.SysDetection;
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
 * @since 2024-08-21
 */
public interface SysDetectionMapper extends BaseMapper<SysDetection> {

    IPage<SysDetection> selectPage(Page<SysDetection> pageParam, @Param("vo") SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo);
}
