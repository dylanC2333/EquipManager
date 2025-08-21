package com.equipment.model.view;

import lombok.Data;

/**
 *
 * 用于任务参与人员前端查询
 */
@Data
public class ViewUserCertificate {

    /**
     * 用户证书类别名称
     */
    private String certificateName;

    /**
     * 用户证书编号
     */
    private String certificateNumber;
}
