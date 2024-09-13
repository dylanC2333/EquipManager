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
 * @TableName sys_equipment_stock
 */
@TableName(value ="sys_equipment_stock")
@Data
public class SysEquipmentStock implements Serializable {
    /**
     * 设备出库id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 设备出入库日期
     */
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

    /**
     * 逻辑出入库
     */
    private Integer isTransfer;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}