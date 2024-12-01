package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.utils.UserInfoHelperService;
import com.equipment.model.system.SysUser;
import com.equipment.system.mapper.SysUserMapper;
import com.equipment.system.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoHelperServiceImpl implements UserInfoHelperService {

//    @Autowired
//    private SysUserService sysUserService;
    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getUserInfo(String userCode) {
//        return sysUserService.getUserInfoByUserCode(userCode);
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_code", userCode);
        return sysUserMapper.selectOne(queryWrapper);
    }
}
