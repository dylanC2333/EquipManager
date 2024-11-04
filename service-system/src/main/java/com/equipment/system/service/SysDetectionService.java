package com.equipment.system.service;

import com.equipment.model.system.SysDetection;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.model.vo.SysDetectionDateBatchSaveVo;

import java.util.List;

/**
* @author A
* @description 针对表【sys_detection】的数据库操作Service
* @createDate 2024-09-13 10:42:39
*/
public interface SysDetectionService extends IService<SysDetection> {

    ViewDetectionNameQuery getLastOne(String employeeCode);

    boolean dateBatchSupplement(SysDetectionDateBatchSaveVo sysDetectionDateBatchSaveVo);
}
