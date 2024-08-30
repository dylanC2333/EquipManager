package com.equipment.model.system;

import java.time.LocalDate;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.Data;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-07-31
 */

@Data
@ApiModel(description = "设备出库")
@TableName("sys_equipment_export")
public class SysEquipmentExport implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设备出库id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 设备名字
     */
    @TableField("equipment_name")
    private String equipmentName;

    /**
     * 设备id
     */
    @TableField("equipment_id")
    private String equipmentId;

    /**
     * 设备出库日期
     */
    @TableField("export_time")
    private LocalDate exportTime;

    /**
     * 出库员工姓名
     */
    @TableField("employee_export_name")
    private String employeeExportName;

    /**
     * 任务id
     */
    @TableField("task_id")
    private String taskId;

    /**
     * 仓库员工姓名
     */
    @TableField("warehouse_manager_name")
    private String warehouseManagerName;

    /**
     * 备注
     */
    @TableField("remarks")
    private String remarks;


}
