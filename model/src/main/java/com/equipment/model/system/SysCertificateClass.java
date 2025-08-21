package com.equipment.model.system;

import com.baomidou.mybatisplus.annotation.TableName;
import com.equipment.model.base.BaseEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * 证书类别表
 * @TableName sys_certificate_class
 */
@TableName(value ="sys_certificate_class")
@Data
public class SysCertificateClass extends BaseEntity implements Serializable {
    /**
     * 类别名称
     */
    private String name;

    /**
     * 描述
     */
    private String description;

}