package com.atguigu.system.mapper;

import com.atguigu.model.vo.SysEquipmentDetectionQueryVo;
import com.atguigu.model.vo.SysEquipmentExportQueryVo;
import com.atguigu.system.entity.SysDetection;
import com.atguigu.system.entity.SysEquipmentExport;
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
