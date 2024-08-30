package com.equipment.system.service.impl;

import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.vo.SysEquipmentUseQueryVo;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.system.mapper.SysEquipmentUseMapper;
import com.equipment.system.service.SysEquipmentUseService;
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
 * @since 2024-08-01
 */
@Service
public class SysEquipmentUseServiceImpl extends ServiceImpl<SysEquipmentUseMapper, SysEquipmentUse> implements SysEquipmentUseService {

    @Autowired
    private SysEquipmentUseMapper sysEquipmentUseMapper;


    @Override
    public IPage<SysEquipmentUse> selectPage(Page<SysEquipmentUse> pageParam, SysEquipmentUseQueryVo sysEquipmentUseQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentUseQueryVo);
    }
}
