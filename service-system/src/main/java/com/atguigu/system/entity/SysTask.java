package com.atguigu.system.entity;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
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
 * @since 2024-07-28
 */
@Data
@ApiModel(description = "任务")
@TableName("sys_task")
public class SysTask implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 任务id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 任务编码
     */
    @TableField("task_code")
    private String taskCode;

    /**
     * 任务开始时间
     */
    @TableField("start_time")
    private LocalDate startTime;

    /**
     * 任务结束时间
     */
    @TableField("end_time")
    private LocalDate endTime;

    /**
     * 任务地点
     */
    @TableField("location")
    private String location;


}
