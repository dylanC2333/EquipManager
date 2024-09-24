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
 * @TableName sys_equipment_stock
 */
@TableName(value ="sys_equipment_stock")
@Data
public class SysEquipmentStock extends BaseEntity implements Serializable {
    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 设备出入库日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date equipmentDate;

    /**
     * 出入库员工编号
     */
    private String userCode;

    /**
     * 任务id
     */
    private String taskCode;

    /**
     * 备注
     */
    private String remarks;

    /**
     * 出入库类型（出库/入库）
     */
    private String type;

    /**
     * 仓库员工编号
     */
    private String warehouseManagerCode;

    /**
     * 虚拟出入库
     */
    private Integer isTransfer;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}