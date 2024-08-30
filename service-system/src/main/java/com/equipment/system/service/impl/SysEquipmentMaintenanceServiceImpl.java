package com.equipment.system.service.impl;

import com.equipment.model.vo.SysEquipmentMaintenanceQueryVo;
import com.equipment.model.system.SysEquipmentMaintenance;
import com.equipment.system.mapper.SysEquipmentMaintenanceMapper;
import com.equipment.system.service.SysEquipmentMaintenanceService;
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
 * @since 2024-08-20
 */
@Service
public class SysEquipmentMaintenanceServiceImpl extends ServiceImpl<SysEquipmentMaintenanceMapper, SysEquipmentMaintenance> implements SysEquipmentMaintenanceService {

    @Autowired
    private SysEquipmentMaintenanceMapper sysEquipmentMaintenanceMapper;

    @Override
    public IPage<SysEquipmentMaintenance> selectPage(Page<SysEquipmentMaintenance> pageParam, SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentMaintenanceQueryVo);
    }
}
