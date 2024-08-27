package com.atguigu.system.service;

import com.atguigu.model.vo.SysEquipmentIntakeQueryVo;
import com.atguigu.system.entity.SysEquipmentIntake;
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
