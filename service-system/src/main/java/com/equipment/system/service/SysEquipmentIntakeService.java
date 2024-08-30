package com.equipment.system.service;

import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.system.SysEquipmentIntake;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-08-01
 */
public interface SysEquipmentIntakeService extends IService<SysEquipmentIntake> {

    IPage<SysEquipmentIntake> selectPage(Page<SysEquipmentIntake> pageParam, SysEquipmentIntakeQueryVo sysEquipmentIntakeQueryVo);
}
