package com.equipment.model.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

import com.equipment.model.base.BaseEntity;
import lombok.Data;

/**
 * 用户表
 * @TableName sys_user
 */
@TableName(value ="sys_user")
@Data
public class SysUser extends BaseEntity implements Serializable {

    /**
     * 员工编号
     */
    private String userCode;

    /**
     * 密码
     */
    private String password;

    /**
     * 员工姓名
     */
    private String userName;

    /**
     * 手机
     */
    private String phone;

    /**
     * 描述
     */
    private String description;

    /**
     * 状态（1：在职 0：离职）
     */
    private Integer status;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}