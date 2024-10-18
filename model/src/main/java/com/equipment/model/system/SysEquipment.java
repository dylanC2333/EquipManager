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
 * @TableName sys_equipment
 */
@TableName(value ="sys_equipment")
@Data
public class SysEquipment extends BaseEntity implements Serializable {

    /**
     * 设备编码
     */
    private String equipmentCode;

    /**
     * 设备名称
     */
    private String equipmentName;

    /**
     * 状态（1：正常 0：停用）
     */
    private Integer status;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}