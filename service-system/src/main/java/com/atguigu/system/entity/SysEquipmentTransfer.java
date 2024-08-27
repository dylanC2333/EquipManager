package com.atguigu.system.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.sun.org.apache.xpath.internal.objects.XString;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-08-19
 */
@Data
@ApiModel(description = "设备交接")
@TableName("sys_equipment_transfer")
public class SysEquipmentTransfer implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设备交接id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 旧任务id
     */
    @TableField("old_task_id")
    private String oldTaskId;

    /**
     * 新任务id
     */
    @TableField("new_task_id")
    private String newTaskId;

    /**
     * 设备id
     */
    @TableField("equipment_id")
    private String equipmentId;

    /**
     * 交付员工id
     */
    @TableField("deliver_employee_id")
    private String deliverEmployeeId;

    /**
     * 接受员工id
     */
    @TableField("receiver_employee_id")
    private String receiverEmployeeId;

    /**
     * 交接日期
     */
    @TableField("transfer_time")
    private LocalDate transferTime;

    /**
     * 交接地点
     */
    @TableField("transfer_location")
    private String transferLocation;

    /**
     * 交接类型（虚拟/真实）
     */
    @TableField("transfer_type")
    private String transferType;

    /**
     * 备注
     */
    @TableField("remarks")
    private String remarks;


}
