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
 * @since 2024-08-20
 */
@Data
@ApiModel(description = "设备保养")
@TableName("sys_equipment_maintenance")
public class SysEquipmentMaintenance implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 保养id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 员工id
     */
    @TableField("employee_id")
    private String employeeId;

    /**
     * 设备id
     */
    @TableField("equipment_id")
    private String equipmentId;

    /**
     * 保养时间
     */
    @TableField("maintenance_time")
    private LocalDate maintenanceTime;

    /**
     * 设备使用前状态
     */
    @TableField("before_use_status")
    private String beforeUseStatus;

    /**
     * 备注
     */
    @TableField("remarks")
    private String remarks;

    /**
     * 设备维护保养状态
     */
    @TableField("maintenance_status")
    private String maintenanceStatus;


}
