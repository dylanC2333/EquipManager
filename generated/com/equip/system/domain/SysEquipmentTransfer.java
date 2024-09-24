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
 * @TableName sys_equipment_transfer
 */
@TableName(value ="sys_equipment_transfer")
@Data
public class SysEquipmentTransfer implements Serializable {
    /**
     * 设备交接id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 旧任务id
     */
    private String oldTaskCode;

    /**
     * 新任务id
     */
    private String newTaskCode;

    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 交付员工id
     */
    private String deliverEmployeeCode;

    /**
     * 接受员工id
     */
    private String receiverEmployeeCode;

    /**
     * 交接日期
     */
    private Date transferDate;

    /**
     * 交接地点
     */
    private String transferLocation;

    /**
     * 交接类型（虚拟/真实）
     */
    private String transferType;

    /**
     * 备注
     */
    private String remarks;

    /**
     * 数据创建时间
     */
    private Date createTime;

    /**
     * 数据更新时间
     */
    private Date updateTime;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    private Integer isDeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}