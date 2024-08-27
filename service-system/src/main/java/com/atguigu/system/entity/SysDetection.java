package com.atguigu.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-08-21
 */
@Data
@ApiModel(description = "设备检测")
@TableName("sys_detection")
public class SysDetection implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 目测id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 员工id
     */
    @TableField("employee_id")
    private String employeeId;

    /**
     * 任务id
     */
    @TableField("task_id")
    private String taskId;

    /**
     * 目测开始时间
     */
    @TableField("start_time")
    private LocalDate startTime;

    /**
     * 目测结束时间
     */
    @TableField("end_time")
    private LocalDate endTime;

    /**
     * 目测地点
     */
    @TableField("detection_location")
    private String detectionLocation;


}
