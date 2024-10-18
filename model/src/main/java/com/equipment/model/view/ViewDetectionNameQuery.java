package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
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