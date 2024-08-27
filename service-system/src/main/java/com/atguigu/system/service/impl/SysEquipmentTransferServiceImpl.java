package com.atguigu.system.service.impl;

import com.atguigu.model.vo.SysEquipmentTransferQueryVo;
import com.atguigu.system.entity.SysEquipmentTransfer;
import com.atguigu.system.mapper.SysEquipmentTransferMapper;
import com.atguigu.system.service.SysEquipmentTransferService;
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
 * @since 2024-08-19
 */
@Service
public class SysEquipmentTransferServiceImpl extends ServiceImpl<SysEquipmentTransferMapper, SysEquipmentTransfer> implements SysEquipmentTransferService {

    @Autowired
    private SysEquipmentTransferMapper sysEquipmentTransferMapper;

    @Override
    public IPage<SysEquipmentTransfer> selectPage(Page<SysEquipmentTransfer> pageParam, SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentTransferQueryVo);
    }
}
