package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 
 * @TableName view_transfer_name_query
 */
@TableName(value ="view_transfer_name_query")
@Data
public class ViewTransferNameQuery implements Serializable {
    /**
     * 设备交接id
     */
    private Long id;

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
     * 员工姓名
     */
    private String deliverEmployeeName;

    /**
     * 员工姓名
     */
    private String receiverEmployeeName;

    /**
     * 设备名称
     */
    private String equipmentName;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}