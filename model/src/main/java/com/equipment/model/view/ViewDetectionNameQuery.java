package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 
 * @TableName view_detection_name_query
 */
@TableName(value ="view_detection_name_query")
@Data
public class ViewDetectionNameQuery implements Serializable {
    /**
     * 目测id
     */
    private Long id;

    /**
     * 员工id
     */
    private String employeeCode;

    /**
     * 任务id
     */
    private String taskCode;

    /**
     * 目测开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    /**
     * 目测结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    /**
     * 目测地点
     */
    private String detectionLocation;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    @TableLogic  //逻辑删除 默认效果 0 没有删除 1 已经删除
    @TableField("is_deleted")
    private Integer isDeleted;

    /**
     * 数据创建时间
     */
    private Date createTime;

    /**
     * 数据更新时间
     */
    private Date updateTime;

    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

    /**
     * 员工姓名
     */
    private String employeeName;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}