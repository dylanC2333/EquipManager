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
 * @TableName sys_equipment_use
 */
@TableName(value ="sys_equipment_use")
@Data
public class SysEquipmentUse implements Serializable {
    /**
     * 设备使用id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 任务id
     */
    private String taskCode;

    /**
     * 设备使用日期
     */
    private Date equipmentUseDate;

    /**
     * 设备使用员工编码
     */
    private String employeeUseCode;

    /**
     * 设备使用地点
     */
    private String location;

    /**
     * 设备使用前状态
     */
    private String preUseEquipmentStatus;

    /**
     * 维护保养情况
     */
    private String maintenanceStatus;

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