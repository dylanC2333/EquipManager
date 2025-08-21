package com.equipment.model.system;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.equipment.model.base.BaseEntity;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;
import org.apache.ibatis.annotations.Delete;

/**
 * 用户证书关联表
 * @TableName sys_user_certificate
 */
@TableName(value ="sys_user_certificate")
@Data
public class SysUserCertificate extends BaseEntity implements Serializable {
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
     * 证书编号
     */
    @TableField(value = "certificate_number")
    private String certificateNumber;

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


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}