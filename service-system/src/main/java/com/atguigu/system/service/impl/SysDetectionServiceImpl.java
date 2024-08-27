package com.atguigu.system.service.impl;

import com.atguigu.model.vo.SysEquipmentDetectionQueryVo;
import com.atguigu.system.entity.SysDetection;
import com.atguigu.system.mapper.SysDetectionMapper;
import com.atguigu.system.service.SysDetectionService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author atguigu
 * @since 2024-08-21
 */
@Service
public class SysDetectionServiceImpl extends ServiceImpl<SysDetectionMapper, SysDetection> implements SysDetectionService {

    @Autowired
    private SysDetectionMapper sysDetectionMapper;

    @Override
    public IPage<SysDetection> selectPage(Page<SysDetection> pageParam, SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentDetectionQueryVo);
    }
}
