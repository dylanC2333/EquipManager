package com.equipment.system.service;

import com.equipment.model.system.SysUserCertificate;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.SysUserCertificateNameVo;

import java.util.List;

/**
* @author A
* @description 针对表【sys_user_certificate(用户证书关联表)】的数据库操作Service
* @createDate 2025-07-15 18:21:00
*/
public interface SysUserCertificateService extends IService<SysUserCertificate> {

    List<SysUserCertificateNameVo> getByUserId(String userid);
}
