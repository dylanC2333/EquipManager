package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipmentStock;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.vo.SysIdleEquipmentFinderQueryVo;
import org.apache.ibatis.annotations.Param;

/**
* @author A
* @description 针对表【sys_equipment_stock】的数据库操作Mapper
* @createDate 2024-09-13 10:42:39
* @Entity com.equip.system.domain.SysEquipmentStock
*/
public interface SysEquipmentStockMapper extends BaseMapper<SysEquipmentStock> {

    IPage<SysEquipmentStock> idleEquipmentFinder(Page<SysEquipmentStock> pageParam, @Param("equipFinderVo")SysIdleEquipmentFinderQueryVo sysIdleEquipmentFinderQueryVo);
}




