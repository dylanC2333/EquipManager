package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.vo.StatisticTaskAndDetection;
import com.equipment.model.vo.UserIDAndDateRageVo;
import org.apache.ibatis.annotations.Param;

/**
* @author A
* @description 针对表【view_detection_name_query】的数据库操作Mapper
* @createDate 2024-10-18 10:56:08
* @Entity com.equipment.system.view.ViewDetectionNameQuery
*/
public interface ViewDetectionNameQueryMapper extends BaseMapper<ViewDetectionNameQuery> {

    IPage<StatisticTaskAndDetection> findUserDetectionCountForBoss(Page<StatisticTaskAndDetection> pageParam,@Param("taskAndDetectionVo") UserIDAndDateRageVo sysTaskDeviceQueryVo);
}




