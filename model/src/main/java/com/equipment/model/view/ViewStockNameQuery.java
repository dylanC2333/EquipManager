package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName view_stock_name_query
 */
@TableName(value ="view_stock_name_query")
@Data
public class ViewStockNameQuery implements Serializable {
    /**
     * 设备出库id
     */
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
    @TableLogic  //逻辑删除 默认效果 0 没有删除 1 已经删除
    @TableField("is_deleted")
    private Integer isDeleted;

    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

    /**
     * 由交接生成的出入库（0：虚拟出入库 1：实际出入库）
     */
    private Integer isTransfer;

    /**
     * 员工姓名
     */
    private String userName;

    /**
     * 员工姓名
     */
    private String warehouseManagerName;

    /**
     * 设备名称
     */
    private String equipmentName;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}