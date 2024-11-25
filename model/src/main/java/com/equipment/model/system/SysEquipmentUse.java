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
 * @TableName sys_equipment_use
 */
@TableName(value ="sys_equipment_use")
@Data
public class SysEquipmentUse extends BaseEntity implements Serializable {
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
    @JsonFormat(pattern = "yyyy-MM-dd")
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
     * 设备使用后状态
     */
    private String postUseEquipmentStatus;

    /**
     * 维护保养情况
     */
    private String maintenanceStatus;

    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}