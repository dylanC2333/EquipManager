package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.system.mapper.SysEquipmentUseMapper;
import com.equipment.system.service.SysEquipmentUseService;
import org.springframework.stereotype.Service;

/**
* @author A
* @description 针对表【sys_equipment_use】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysEquipmentUseServiceImpl extends ServiceImpl<SysEquipmentUseMapper, SysEquipmentUse>
    implements SysEquipmentUseService {

    @Override
    public IPage<SysEquipmentUse> taskDevice(Page<SysEquipmentUse> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        return baseMapper.taskDevice(pageParam,sysTaskDeviceQueryVo);
    }
}




