package com.equipment.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipmentUse;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.SysEquipmentUsageDateBatchSaveVo;
import com.equipment.model.vo.SysEquipmentUsageDaysQueryVo;
import com.equipment.model.vo.SysTaskDeviceQueryVo;

/**
* @author A
* @description 针对表【sys_equipment_use】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysEquipmentUseService extends IService<SysEquipmentUse> {

    IPage<SysEquipmentUse> taskDevice(Page<SysEquipmentUse> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo);

    IPage<SysEquipmentUse> equipmentUsageDays(Page<SysEquipmentUse> pageParam, SysEquipmentUsageDaysQueryVo sysEquipmentUsageDaysQueryVo);

    boolean dateBatchSupplement(SysEquipmentUsageDateBatchSaveVo sysDetectionDateBatchSaveVo);

    SysEquipmentUse getLastOne(String employeeUseCode);
}
