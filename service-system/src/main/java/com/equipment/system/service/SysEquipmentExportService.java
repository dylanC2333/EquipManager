package com.equipment.system.service;

import com.equipment.model.vo.SysEquipmentExportQueryVo;
import com.equipment.model.system.SysEquipmentExport;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-31
 */
public interface SysEquipmentExportService extends IService<SysEquipmentExport> {

    IPage<SysEquipmentExport> selectPage(Page<SysEquipmentExport> pageParam, SysEquipmentExportQueryVo sysEquipmentExportQueryVo);
}
