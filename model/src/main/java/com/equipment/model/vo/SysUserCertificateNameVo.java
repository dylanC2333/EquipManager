package com.equipment.model.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.equipment.model.base.BaseEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户证书关联表-带名字对象
 * @TableName sys_user_certificate
 */

@Data
public class SysUserCertificateNameVo extends BaseEntity implements Serializable {
    /**
     * 用户id
     */
    @TableField(value = "user_id")
    private Long userId;

    /**
     * 证书类别id
     */
    @TableField(value = "class_id")
    private String classId;


    /**
     * 员工姓名-sys_user
     */
    @TableField(exist = false)
    private String userName;

    /**
     * 证书编号
     */
    @TableField(value = "certificate_number")
    private String certificateNumber;

    /**
     * 类别名称-sys_certificate_class
     */
    @TableField(exist = false)
    private String certificateName;

    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time")
    private Date updateTime;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    @TableField(value = "is_deleted")
    private Integer isDeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}