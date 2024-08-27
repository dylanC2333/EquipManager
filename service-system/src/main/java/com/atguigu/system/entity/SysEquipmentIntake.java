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
 * @since 2024-08-01
 */
@Data
@ApiModel(description = "设备入库")
@TableName("sys_equipment_intake")
public class SysEquipmentIntake implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设备入库id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 任务id
     */
    private String taskId;

    /**
     * 设备id
     */
    @TableField("equipment_id")
    private String equipmentId;

    /**
     * 设备入库时间
     */
    @TableField("intake_time")
    private LocalDate intakeTime;

    /**
     * 入库员工姓名
     */
    @TableField("employee_intake_name")
    private String employeeIntakeName;

    /**
     * 备注
     */
    @TableField("remarks")
    private String remarks;

    /**
     * 设备名称
     */
    @TableField("equipment_name")
    private String equipmentName;

    /**
     * 仓库管理员名字
     */
    @TableField("warehouse_manager_name")
    private String warehouseManagerName;


}
