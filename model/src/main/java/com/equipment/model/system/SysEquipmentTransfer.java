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
 * @TableName sys_equipment_transfer
 */
@TableName(value ="sys_equipment_transfer")
@Data
public class SysEquipmentTransfer extends BaseEntity implements Serializable {
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date transferDate;

    /**
     * 交接地点
     */
    private String transferLocation;

    /**
     * 备注
     */
    private String remarks;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}