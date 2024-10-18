package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
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