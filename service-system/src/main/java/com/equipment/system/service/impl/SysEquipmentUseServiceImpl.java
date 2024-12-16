package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.model.vo.SysEquipmentUsageDateBatchSaveVo;
import com.equipment.model.vo.SysEquipmentUsageDaysQueryVo;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.system.mapper.SysEquipmentUseMapper;
import com.equipment.system.service.SysEquipmentUseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

/**
* @author A
* @description 针对表【sys_equipment_use】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysEquipmentUseServiceImpl extends ServiceImpl<SysEquipmentUseMapper, SysEquipmentUse>
    implements SysEquipmentUseService {

    @Autowired
    private SysEquipmentUseService sysEquipmentUseService;

    @Override
    public IPage<SysEquipmentUse> taskDevice(Page<SysEquipmentUse> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        return baseMapper.taskDevice(pageParam,sysTaskDeviceQueryVo);
    }

    @Override
    public IPage<SysEquipmentUse> equipmentUsageDays(Page<SysEquipmentUse> pageParam, SysEquipmentUsageDaysQueryVo sysEquipmentUsageDaysQueryVo) {
        return baseMapper.equipmentUsageDays(pageParam,sysEquipmentUsageDaysQueryVo);
    }

    @Override
    public boolean dateBatchSupplement(SysEquipmentUsageDateBatchSaveVo batchSaveVo) {

        List<SysEquipmentUse> sysEquipmentUseList = new ArrayList<>();

        // 将 Date 转换为 LocalDate
        LocalDate startDate = new java.sql.Date(batchSaveVo.getStartDate().getTime()).toLocalDate();
        LocalDate endDate = new java.sql.Date(batchSaveVo.getEndDate().getTime()).toLocalDate();

        // 遍历日期范围，生成 SysDetection 记录
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            SysEquipmentUse sysEquipmentUse = new SysEquipmentUse();
            sysEquipmentUse.setEquipmentCode(batchSaveVo.getEquipmentCode());
            sysEquipmentUse.setTaskCode(batchSaveVo.getTaskCode());
            sysEquipmentUse.setEmployeeUseCode(batchSaveVo.getEmployeeUseCode());
            sysEquipmentUse.setLocation(batchSaveVo.getLocation());
            sysEquipmentUse.setPreUseEquipmentStatus(batchSaveVo.getPreUseEquipmentStatus());
            sysEquipmentUse.setPostUseEquipmentStatus(batchSaveVo.getPostUseEquipmentStatus());
            sysEquipmentUse.setMaintenanceStatus(batchSaveVo.getMaintenanceStatus());
            sysEquipmentUse.setRemarks(batchSaveVo.getRemarks());
            sysEquipmentUse.setIsAdditional(batchSaveVo.getIsAdditional());
            // 使用系统默认时区将 LocalDate 转回 Date 类型
            sysEquipmentUse.setEquipmentUseDate(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));

            sysEquipmentUseList.add(sysEquipmentUse);
        }
        return sysEquipmentUseService.saveBatch(sysEquipmentUseList);
    }
}




