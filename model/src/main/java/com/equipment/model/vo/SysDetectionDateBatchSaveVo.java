package com.equipment.model.vo;

import com.equipment.model.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * 自动批量补充日期输入数据对象
 */
@Data
public class SysDetectionDateBatchSaveVo extends BaseEntity implements Serializable {
    /**
     * 员工id
     */
    private String employeeCode;

    /**
     * 任务id
     */
    private String taskCode;

    /**
     * 检测记录自动填充开始日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    /**
     * 检测记录自动填充结束日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    /**
     * 检测地点
     */
    private String detectionLocation;

    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

}
