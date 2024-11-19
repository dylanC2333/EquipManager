package com.equipment.model.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

import com.equipment.model.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 
 * @TableName sys_detection
 */
@TableName(value ="sys_detection")
@Data
public class SysDetection extends BaseEntity implements Serializable  {
    /**
     * 员工id
     */
    private String employeeCode;

    /**
     * 任务id
     */
    private String taskCode;

    /**
     * 检测时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

//    /**
//     * 目测结束时间（已弃用）
//     */
//    @JsonFormat(pattern = "yyyy-MM-dd")
//    private Date endDate;

    /**
     * 检测地点
     */
    private String detectionLocation;

    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}