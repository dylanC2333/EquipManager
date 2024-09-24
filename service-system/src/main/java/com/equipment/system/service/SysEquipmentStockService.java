package com.equipment.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipmentStock;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.SysIdleEquipmentFinderQueryVo;

/**
* @author A
* @description 针对表【sys_equipment_stock】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysEquipmentStockService extends IService<SysEquipmentStock> {

    IPage<SysEquipmentStock> idleEquipmentFinder(Page<SysEquipmentStock> pageParam, SysIdleEquipmentFinderQueryVo sysIdleEquipmentFinderQueryVo);
}
