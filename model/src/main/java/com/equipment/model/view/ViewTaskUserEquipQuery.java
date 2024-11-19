package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 
 * @TableName view_task_user_equip_query
 */
@TableName(value ="view_task_user_equip_query")
@Data
public class ViewTaskUserEquipQuery implements Serializable {
    /**
     * 
     */
    private String userName;

    /**
     * 
     */
    private String employeeCode;

    /**
     * 
     */
    private String taskCode;

    /**
     * 
     */
    private String equipmentCode;

    /**
     * 
     */
    private Integer isAdditional;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}