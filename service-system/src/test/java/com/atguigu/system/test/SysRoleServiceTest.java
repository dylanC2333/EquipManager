package com.atguigu.system.test;

import com.atguigu.model.system.SysRole;
import com.atguigu.system.service.SysRoleService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SysRoleServiceTest {

    @Autowired
    private SysRoleService sysRoleService;

    @Test
    public void findAll(){
        List<SysRole> list = sysRoleService.list();
        System.out.println(list);
    }

    //添加操作
    @Test
    public  void add(){
        SysRole sysRole = new SysRole();
        sysRole.setRoleName("角色管理员atguigu");
        sysRole.setRoleCode("role");
        sysRole.setDescription("角色管理员");
        sysRoleService.save(sysRole);
    }

    //修改
    @Test
    public void update(){
        SysRole sysRole = sysRoleService.getById(1);
        sysRole.setDescription("test");
        sysRoleService.updateById(sysRole);
    }

    //删除
    @Test
    public void remove(){
        sysRoleService.removeById(8);
    }

    //条件查询
    @Test
    public void select(){
        QueryWrapper<SysRole> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("role_code","SYSTEM");
        List<SysRole> list = sysRoleService.list(queryWrapper);
        System.out.println(list);
    }

}
