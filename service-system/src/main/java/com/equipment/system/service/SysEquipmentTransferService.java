package com.equipment.system.service;

import com.equipment.model.vo.SysEquipmentTransferQueryVo;
import com.equipment.model.system.SysEquipmentTransfer;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-08-19
 */
public interface SysEquipmentTransferService extends IService<SysEquipmentTransfer> {

    IPage<SysEquipmentTransfer> selectPage(Page<SysEquipmentTransfer> pageParam, SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo);
}
