package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysEquipment;
import com.equipment.model.vo.EquipmentUseDayCount;
import com.equipment.model.vo.UserIDAndDateRageVo;
import com.equipment.system.mapper.SysEquipmentMapper;
import com.equipment.system.service.SysEquipmentService;
import org.springframework.stereotype.Service;

/**
* @author A
* @description 针对表【sys_equipment】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysEquipmentServiceImpl extends ServiceImpl<SysEquipmentMapper, SysEquipment>
    implements SysEquipmentService {

    @Override
    public IPage<EquipmentUseDayCount> EquipmentUseDaysCount(Page<EquipmentUseDayCount> pageParam, UserIDAndDateRageVo sysTaskDeviceQueryVo) {
        return baseMapper.EquipmentUseDaysCount_Mapper(pageParam,sysTaskDeviceQueryVo);
    }
}




