package com.equipment.system.test;

import com.equipment.common.result.Result;
import com.equipment.model.system.SysUser;
import com.equipment.system.service.SysUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest

public class SysUserServiceTest {

    @Autowired
    SysUserService sysUserService;

    @Test
    public void testgetUserListByRoleName(){
        List<SysUser> sysUserList = null;
        sysUserList = sysUserService.getUserListByRoleName("设备使用人员");
        System.out.println(sysUserList);
    }

}
