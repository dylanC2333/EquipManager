package com.equipment.model.system;

import java.time.LocalDate;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-08-01
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SysEquipmentUse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设备使用id
     */
    @TableId(type = IdType.AUTO)
    private String id;


    /**
     * 设备名称
     */
    @TableField("equipment_name")
    private String equipmentName;

    /**
     * 设备id
     */
    @TableField("equipment_id")
    private String equipmentId;

    /**
     * 任务id
     */
    @TableField("task_id")
    private String taskId;

    /**
     * 设备使用日期
     */
    @TableField("equipment_use_time")
    private LocalDate equipmentUseTime;

    /**
     * 设备使用员工姓名
     */
    @TableField("employee_use_name")
    private String employeeUseName;

    /**
     * 设备使用地点
     */
    @TableField("location")
    private String location;

    /**
     * 设备使用前状态
     */
    @TableField("pre_use_equipment_status")
    private String preUseEquipmentStatus;

    /**
     * 维护保养情况
     */
    @TableField("maintenance_status")
    private String maintenanceStatus;


}
