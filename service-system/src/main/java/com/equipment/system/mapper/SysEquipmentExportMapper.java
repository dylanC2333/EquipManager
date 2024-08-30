package com.equipment.system.mapper;


import com.equipment.model.vo.SysEquipmentExportQueryVo;
import com.equipment.model.system.SysEquipmentExport;
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
 * @since 2024-07-31
 */
public interface SysEquipmentExportMapper extends BaseMapper<SysEquipmentExport> {

    IPage<SysEquipmentExport> selectPage(Page<SysEquipmentExport> pageParam, @Param("vo") SysEquipmentExportQueryVo sysEquipmentExportQueryVo);
}
