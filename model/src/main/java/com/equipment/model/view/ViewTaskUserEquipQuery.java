package com.equipment.model.view;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String title;

    /**
     * 
     */
    private Integer isAdditional;

    // 添加这两个字段用于处理证书逻辑
    @JsonIgnore
    private String certificatesJson;

    private List<ViewUserCertificate> allCertificates;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}