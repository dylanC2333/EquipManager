package com.equipment.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.EquipmentUseDayCount;
import com.equipment.model.vo.UserIDAndDateRageVo;

/**
* @author A
* @description 针对表【sys_equipment】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysEquipmentService extends IService<SysEquipment> {

    IPage<EquipmentUseDayCount> EquipmentUseDaysCount(Page<EquipmentUseDayCount> pageParam, UserIDAndDateRageVo sysTaskDeviceQueryVo);
}
