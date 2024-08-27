package com.atguigu.system.service;

import com.atguigu.model.vo.SysEquipmentDetectionQueryVo;
import com.atguigu.system.entity.SysDetection;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-08-21
 */
public interface SysDetectionService extends IService<SysDetection> {

    IPage<SysDetection> selectPage(Page<SysDetection> pageParam, SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo);
}
