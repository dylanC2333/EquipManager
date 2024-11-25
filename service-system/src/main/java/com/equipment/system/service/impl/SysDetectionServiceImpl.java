package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysDetection;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.model.vo.SysDetectionDateBatchSaveVo;
import com.equipment.system.mapper.SysDetectionMapper;
import com.equipment.system.mapper.ViewDetectionNameQueryMapper;
import com.equipment.system.service.SysDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

/**
* @author A
* @description 针对表【sys_detection】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysDetectionServiceImpl extends ServiceImpl<SysDetectionMapper, SysDetection>
    implements SysDetectionService {

    @Autowired
    private SysDetectionService sysDetectionService;

    @Autowired
    private SysDetectionMapper sysDetectionMapper;

//    @Override
//    public ViewDetectionNameQuery getLastOne(String employeeCode) {
//        QueryWrapper<ViewDetectionNameQuery> wrapper = new QueryWrapper<>();
//        wrapper.eq("employee_code", employeeCode)
//                .orderByDesc("start_date")
//                .last("limit 1");
//        // 使用实例调用 selectOne
//        return viewDetectionNameQueryMapper.selectOne(wrapper);
//    }

    @Override
    public SysDetection getLastOne(String employeeCode) {
        QueryWrapper<SysDetection> wrapper = new QueryWrapper<>();
        wrapper.eq("employee_code", employeeCode)
                .orderByDesc("start_date")
                .last("limit 1");
        // 使用实例调用 selectOne
        return sysDetectionMapper.selectOne(wrapper);
    }

    @Override
    public boolean dateBatchSupplement(SysDetectionDateBatchSaveVo batchSaveVo) {
        List<SysDetection> sysDetectionList = new ArrayList<>();

        // 将 Date 转换为 LocalDate
        LocalDate startDate = new java.sql.Date(batchSaveVo.getStartDate().getTime()).toLocalDate();
        LocalDate endDate = new java.sql.Date(batchSaveVo.getEndDate().getTime()).toLocalDate();

        // 遍历日期范围，生成 SysDetection 记录
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            SysDetection sysDetection = new SysDetection();
            sysDetection.setEmployeeCode(batchSaveVo.getEmployeeCode());
            sysDetection.setTaskCode(batchSaveVo.getTaskCode());
            sysDetection.setDetectionLocation(batchSaveVo.getDetectionLocation());
            sysDetection.setIsAdditional(batchSaveVo.getIsAdditional());
            // 使用系统默认时区将 LocalDate 转回 Date 类型
            sysDetection.setStartDate(Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant()));

            sysDetectionList.add(sysDetection);
        }
        return sysDetectionService.saveBatch(sysDetectionList);
    }
}




