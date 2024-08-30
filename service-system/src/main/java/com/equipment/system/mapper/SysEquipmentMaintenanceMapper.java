package com.equipment.system.mapper;

import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.vo.SysEquipmentMaintenanceQueryVo;
import com.equipment.model.system.SysEquipmentMaintenance;
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
 * @since 2024-08-20
 */
public interface SysEquipmentMaintenanceMapper extends BaseMapper<SysEquipmentMaintenance> {

    IPage<SysEquipmentMaintenance> selectPage(Page<SysEquipmentMaintenance> pageParam, @Param("vo") SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo);

}
