package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.vo.EquipmentUseDayCount;
import com.equipment.model.vo.UserIDAndDateRageVo;
import org.apache.ibatis.annotations.Param;

/**
* @author A
* @description 针对表【sys_equipment】的数据库操作Mapper
* @createDate 2024-09-13 10:42:39
* @Entity com.equip.system.domain.SysEquipment
*/
public interface SysEquipmentMapper extends BaseMapper<SysEquipment> {

    IPage<EquipmentUseDayCount> EquipmentUseDaysCount_Mapper(Page<EquipmentUseDayCount> pageParam, @Param("CountEquipmentUseDaysVo")UserIDAndDateRageVo sysTaskDeviceQueryVo);
}




