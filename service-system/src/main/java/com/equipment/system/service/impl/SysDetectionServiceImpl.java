package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysDetection;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.system.mapper.SysDetectionMapper;
import com.equipment.system.mapper.ViewDetectionNameQueryMapper;
import com.equipment.system.service.SysDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
* @author A
* @description 针对表【sys_detection】的数据库操作Service实现
* @createDate 2024-09-13 10:42:39
*/
@Service
public class SysDetectionServiceImpl extends ServiceImpl<SysDetectionMapper, SysDetection>
    implements SysDetectionService {

    @Autowired
    private ViewDetectionNameQueryMapper viewDetectionNameQueryMapper;

    @Override
    public ViewDetectionNameQuery getLastOne(String employeeCode) {
        QueryWrapper<ViewDetectionNameQuery> wrapper = new QueryWrapper<>();
        wrapper.eq("employee_code", employeeCode)
                .orderByDesc("start_date")
                .last("limit 1");
        // 使用实例调用 selectOne
        return viewDetectionNameQueryMapper.selectOne(wrapper);
    }
}




