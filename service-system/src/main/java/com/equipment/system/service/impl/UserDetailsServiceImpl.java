package com.equipment.system.service.impl;

import com.equipment.model.system.SysUser;
import com.equipment.system.custom.CustomUser;
import com.equipment.system.service.SysMenuService;
import com.equipment.system.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysMenuService sysMenuService;


    @Override
    // 这个方法实现类名字不能改，因为是对于库里写好的service接口的实现
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        SysUser sysUser = sysUserService.getUserInfoByUserCode(userCode);
        if (sysUser == null) {
            throw new UsernameNotFoundException("账号不存在");
        }
        if(sysUser.getStatus()== 0){
            throw new RuntimeException("账号已停用");
        }
        List<String> userPermsList = sysMenuService.getUserButtonList(sysUser.getId());
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (String perm : userPermsList) {
            authorities.add(new SimpleGrantedAuthority(perm.trim()));
        }
        return new CustomUser(sysUser, authorities);
    }
}
