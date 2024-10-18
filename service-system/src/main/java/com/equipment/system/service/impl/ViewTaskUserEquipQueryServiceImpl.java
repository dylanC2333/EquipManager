package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.equipment.model.system.SysEquipmentUse;
import com.equipment.model.view.ViewTaskUserEquipQuery;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.system.mapper.ViewTaskUserEquipQueryMapper;
import com.equipment.system.service.ViewTaskUserEquipQueryService;
import org.springframework.stereotype.Service;

/**
* @author ASUS
* @description 针对表【view_task_user_equip_query】的数据库操作Service实现
* @createDate 2024-10-18 15:51:05
*/
@Service
public class ViewTaskUserEquipQueryServiceImpl extends ServiceImpl<ViewTaskUserEquipQueryMapper, ViewTaskUserEquipQuery>
    implements ViewTaskUserEquipQueryService {

    @Override
    public IPage<SysEquipmentUse> SearchUserDeviceByTaskcode(Page<SysEquipmentUse> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        return baseMapper.SearchUserDeviceByTaskcode(pageParam, sysTaskDeviceQueryVo);
    }
}




