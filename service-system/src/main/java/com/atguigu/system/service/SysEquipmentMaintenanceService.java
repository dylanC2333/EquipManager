package com.atguigu.system.service;

import com.atguigu.model.vo.SysEquipmentMaintenanceQueryVo;
import com.atguigu.system.entity.SysEquipmentMaintenance;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-08-20
 */
public interface SysEquipmentMaintenanceService extends IService<SysEquipmentMaintenance> {

    IPage<SysEquipmentMaintenance> selectPage(Page<SysEquipmentMaintenance> pageParam, SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo);
}
