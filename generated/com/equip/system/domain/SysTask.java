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
 * @TableName sys_task
 */
@TableName(value ="sys_task")
@Data
public class SysTask implements Serializable {
    /**
     * 任务id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 任务编码
     */
    private String taskCode;

    /**
     * 任务开始时间
     */
    private Date startDate;

    /**
     * 任务结束时间
     */
    private Date endDate;

    /**
     * 任务地点
     */
    private String location;

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