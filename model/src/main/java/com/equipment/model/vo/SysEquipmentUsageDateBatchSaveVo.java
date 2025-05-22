package com.equipment.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.equipment.model.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class SysEquipmentUsageDateBatchSaveVo extends BaseEntity implements Serializable {
    /**
     * 设备id
     */
    private String equipmentCode;

    /**
     * 任务id
     */
    private String taskCode;

//    /**
//     * 设备使用日期
//     */
//    @JsonFormat(pattern = "yyyy-MM-dd")
//    private Date equipmentUseDate;

    /**
     * 设备使用记录自动填充开始日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    /**
     * 设备使用记录自动填充结束日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    /**
     * 设备使用员工编码
     */
    private String employeeUseCode;

    /**
     * 设备使用地点
     */
    private String location;

    /**
     * 设备使用前状态
     */
    private String preUseEquipmentStatus;

    /**
     * 设备使用后状态
     */
    private String postUseEquipmentStatus;

    /**
     * 维护保养情况
     */
    private String maintenanceStatus;

    /**
     * 维护保养情况
     */
    private String remarks;
    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
