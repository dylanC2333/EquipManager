package com.equipment.system.service.impl;

import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.system.SysEquipmentIntake;
import com.equipment.system.mapper.SysEquipmentIntakeMapper;
import com.equipment.system.service.SysEquipmentIntakeService;
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
public class SysEquipmentIntakeServiceImpl extends ServiceImpl<SysEquipmentIntakeMapper, SysEquipmentIntake> implements SysEquipmentIntakeService {

    @Autowired
    private SysEquipmentIntakeMapper sysEquipmentIntakeMapper;

    @Override
    public IPage<SysEquipmentIntake> selectPage(Page<SysEquipmentIntake> pageParam, SysEquipmentIntakeQueryVo sysEquipmentIntakeQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentIntakeQueryVo);
    }
}
