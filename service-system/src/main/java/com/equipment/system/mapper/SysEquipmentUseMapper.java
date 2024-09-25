package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipmentUse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.vo.SysEquipmentUsageDaysQueryVo;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import org.apache.ibatis.annotations.Param;

/**
* @author A
* @description 针对表【sys_equipment_use】的数据库操作Mapper
* @createDate 2024-09-13 10:42:39
* @Entity com.equip.system.domain.SysEquipmentUse
*/
public interface SysEquipmentUseMapper extends BaseMapper<SysEquipmentUse> {

    IPage<SysEquipmentUse> taskDevice(Page<SysEquipmentUse> pageParam, @Param("taskDeviceVo")SysTaskDeviceQueryVo sysTaskDeviceQueryVo);

    IPage<SysEquipmentUse> equipmentUsageDays(Page<SysEquipmentUse> pageParam, @Param("equipUseDayVo")SysEquipmentUsageDaysQueryVo sysEquipmentUsageDaysQueryVo);
}




