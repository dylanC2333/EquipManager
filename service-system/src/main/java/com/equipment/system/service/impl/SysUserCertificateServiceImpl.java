package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.equipment.model.system.SysCertificateClass;
import com.equipment.model.system.SysUser;
import com.equipment.model.system.SysUserCertificate;
import com.equipment.model.vo.SysUserCertificateNameVo;
import com.equipment.system.service.SysCertificateClassService;
import com.equipment.system.service.SysUserCertificateService;
import com.equipment.system.mapper.SysUserCertificateMapper;
import com.equipment.system.service.SysUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
* @author A
* @description 针对表【sys_user_certificate(用户证书关联表)】的数据库操作Service实现
* @createDate 2025-07-15 18:21:00
*/
@Service
public class SysUserCertificateServiceImpl extends ServiceImpl<SysUserCertificateMapper, SysUserCertificate>
    implements SysUserCertificateService{

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysCertificateClassService sysCertificateClassService;

    @Override
    public List<SysUserCertificateNameVo> getByUserId(String userid) {
        //根据userid先获取用户证书表，然后联表查询用户名称、类别名称
        // 1. 查询用户证书列表
        QueryWrapper<SysUserCertificate> userCertificateQuery = new QueryWrapper<>();
        userCertificateQuery.eq("user_id", userid);
        List<SysUserCertificate> userCerList = baseMapper.selectList(userCertificateQuery);

        // 2. 获取用户名称
        SysUser sysUser = sysUserService.getById(userid);
        String userName = sysUser != null ? sysUser.getUserName() : "";

        // 3. 获取所有证书类别并转换为Map，方便后续通过 ID 获取名称
        List<SysCertificateClass> classList = sysCertificateClassService.list();
        Map<String,String> classIdNameMap = classList.stream()
                .collect(Collectors.toMap(SysCertificateClass::getId, SysCertificateClass::getName));

        // 4. 使用流式处理转换为 VO 列表
        List<SysUserCertificateNameVo> voList = userCerList.stream().map(entity ->{
            SysUserCertificateNameVo vo = new SysUserCertificateNameVo();
            //拷贝属性，如果字段名一致
            BeanUtils.copyProperties(entity,vo);
            //设置额外字段
            vo.setUserName(userName);
            //需要类型转换，id为String，但是classId为long。
            vo.setCertificateName(classIdNameMap.getOrDefault(String.valueOf(entity.getClassId()), ""));
            return vo;
        }).collect(Collectors.toList());

        return voList;
    }
}




