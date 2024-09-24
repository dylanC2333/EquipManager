package com.equip.system.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName sys_detection
 */
@TableName(value ="sys_detection")
@Data
public class SysDetection implements Serializable {
    /**
     * 目测id
     */
    @TableId(type = IdType.AUTO)
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
    private Date startDate;

    /**
     * 目测结束时间
     */
    private Date endDate;

    /**
     * 目测地点
     */
    private String detectionLocation;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    private Integer isDeleted;

    /**
     * 数据创建时间
     */
    private Date createTime;

    /**
     * 数据更新时间
     */
    private Date updateTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}