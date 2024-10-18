package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName view_maintenance_name_query
 */
@TableName(value ="view_maintenance_name_query")
@Data
public class ViewMaintenanceNameQuery implements Serializable {
    /**
     * 保养id
     */
    private Long id;

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

    /**
     * 删除标记（0:可用 1:已删除）
     */
    @TableLogic  //逻辑删除 默认效果 0 没有删除 1 已经删除
    @TableField("is_deleted")
    private Integer isDeleted;

    /**
     * 数据创建时间
     */
    private Date createTime;

    /**
     * 数据更新时间
     */
    private Date updateTime;

    /**
     * 员工姓名
     */
    private String userName;

    /**
     * 设备名称
     */
    private String equipmentName;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}