package com.equipment.system.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.StatisticTaskAndDetection;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.model.vo.UserIDAndDateRageVo;

import java.sql.Wrapper;

/**
* @author A
* @description 针对表【view_detection_name_query】的数据库操作Service
* @createDate 2024-10-18 10:56:08
*/
public interface ViewDetectionNameQueryService extends IService<ViewDetectionNameQuery> {


    IPage<StatisticTaskAndDetection> UserDetectionCountForBoss(Page<StatisticTaskAndDetection> pageParam, UserIDAndDateRageVo sysTaskDeviceQueryVo);
}
