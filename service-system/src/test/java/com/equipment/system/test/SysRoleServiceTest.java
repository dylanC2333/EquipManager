package com.equipment.system.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.model.system.SysRole;
import com.equipment.system.service.SysRoleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SysRoleServiceTest {

    @Autowired
    private SysRoleService sysRoleService;

    // 查询所有
    @Test
    public void findAll(){
        List<SysRole> list= sysRoleService.list();
        System.out.println(list);
    }
    // 添加
    @Test
    public void add(){
        SysRole sysRole = new SysRole();
        sysRole.setRoleName("角色管理员");
        sysRole.setRoleCode("role");
        sysRole.setDescription("角色管理员");

        boolean result = sysRoleService.save(sysRole);//返回参数需要查看IService中如何封装
        System.out.println(result);
    }
    // 修改
    @Test
    public void update(){
        SysRole sysRole = new SysRole();
        sysRole.setId("1820804400093589505");
        sysRole.setDescription("角色零");

        boolean result = sysRoleService.updateById(sysRole);
        System.out.println(result);
    }
    // 删除
    @Test
    public void deleteById(){
        boolean result = sysRoleService.removeById("11");
        System.out.println(result);
    }

    // 条件查询
    @Test
    public void QueryWrapper(){
        QueryWrapper<SysRole> wrapper = new QueryWrapper<>();
        wrapper.like("role_name","管理员");
        List<SysRole> users = sysRoleService.list(wrapper);
        System.out.println(users);
    }
}
