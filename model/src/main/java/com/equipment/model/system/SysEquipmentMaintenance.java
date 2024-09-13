package com.equipment.model.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

import com.equipment.model.base.BaseEntity;
import lombok.Data;

/**
 * 
 * @TableName sys_equipment_maintenance
 */
@TableName(value ="sys_equipment_maintenance")
@Data
public class SysEquipmentMaintenance extends BaseEntity implements Serializable {
    /**
     * 员工id
     */
    private String employeeCode;

    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 保养时间
     */
    private Date maintenanceDate;

    /**
     * 设备使用前状态
     */
    private String beforeUseStatus;

    /**
     * 备注
     */
    private String remarks;

    /**
     * 设备维护保养状态
     */
    private String maintenanceStatus;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}