package com.atguigu.system.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
@Data
@ApiModel(description = "设备")
@TableName("sys_equipment")
public class SysEquipment implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 设备id
     */
    @TableId(type = IdType.AUTO)
    private String id;

    /**
     * 设备编码
     */
    @TableField("equipment_code")
    private String equipmentCode;

    /**
     * 设备名称
     */
    @TableField("equipment_name")
    private String equipmentName;




}
