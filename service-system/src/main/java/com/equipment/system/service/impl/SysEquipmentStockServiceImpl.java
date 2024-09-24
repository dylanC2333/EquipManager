package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysEquipmentStock;
import com.equipment.model.vo.SysIdleEquipmentFinderQueryVo;
import com.equipment.system.mapper.SysEquipmentStockMapper;
import com.equipment.system.service.SysEquipmentStockService;
import org.springframework.stereotype.Service;

/**
* @author A
* @description 针对表【sys_equipment_stock】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysEquipmentStockServiceImpl extends ServiceImpl<SysEquipmentStockMapper, SysEquipmentStock>
    implements SysEquipmentStockService {

    @Override
    public IPage<SysEquipmentStock> idleEquipmentFinder(Page<SysEquipmentStock> pageParam, SysIdleEquipmentFinderQueryVo sysIdleEquipmentFinderQueryVo) {
        return baseMapper.idleEquipmentFinder(pageParam,sysIdleEquipmentFinderQueryVo);
    }
}




