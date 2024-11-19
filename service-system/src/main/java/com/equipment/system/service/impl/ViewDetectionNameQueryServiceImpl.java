package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysUser;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.model.vo.StatisticTaskAndDetection;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.model.vo.UserIDAndDateRageVo;
import com.equipment.system.service.ViewDetectionNameQueryService;
import com.equipment.system.mapper.ViewDetectionNameQueryMapper;
import org.springframework.stereotype.Service;

import java.sql.Wrapper;

/**
* @author A
* @description 针对表【view_detection_name_query】的数据库操作Service实现
* @createDate 2024-10-18 10:56:08
*/
@Service
public class ViewDetectionNameQueryServiceImpl extends ServiceImpl<ViewDetectionNameQueryMapper, ViewDetectionNameQuery>
    implements ViewDetectionNameQueryService{


    @Override
    public IPage<StatisticTaskAndDetection> UserDetectionCountForBoss(Page<StatisticTaskAndDetection> pageParam, UserIDAndDateRageVo sysTaskDeviceQueryVo) {
        return baseMapper.findUserDetectionCountForBoss(pageParam, sysTaskDeviceQueryVo);
    }
}




