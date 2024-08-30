package com.equipment.system.service;

import com.equipment.model.vo.SysEquipQueryVo;
import com.equipment.model.vo.SysRoleQueryVo;
import com.equipment.model.system.SysEquipment;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
public interface SysEquipmentService extends IService<SysEquipment> {


    IPage<SysEquipment> selectPage(Page<SysEquipment> pageParam, SysEquipQueryVo sysEquipQueryVo);
}
