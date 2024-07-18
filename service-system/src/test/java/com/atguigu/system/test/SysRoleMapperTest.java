package com.atguigu.system.test;

import com.atguigu.model.system.SysRole;
import com.atguigu.system.mapper.SysRoleMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class SysRoleMapperTest {

    @Autowired
    private  SysRoleMapper sysRoleMapper;

    //1、查询所有
    @Test
    public void findall(){
        List<SysRole> list= sysRoleMapper.selectList(null);
        for(SysRole sysRole:list) {
            System.out.println(sysRole);
        }
    }

    //2、添加操作
    @Test
    public void add(){
        SysRole sysRole=new SysRole();
        sysRole.setRoleName("测试角色3");
        sysRole.setRoleCode("testManager");
        sysRole.setDescription("测试角色3");
        int rows = sysRoleMapper.insert(sysRole);
        System.out.println(rows);
    }

    //3、修改操作
    @Test
    public void update(){
        SysRole sysRole = sysRoleMapper.selectById(1);

        sysRole.setDescription("系统管理员尚硅谷");

        sysRoleMapper.updateById(sysRole);
    }

    //4、删除
    @Test
    public void delete(){
        int rows = sysRoleMapper.deleteById(1);
        
    }
    
    //5、批量删除
    @Test
    public void testBatchDelete(){
        int rows = sysRoleMapper.deleteBatchIds(Arrays.asList(1, 2));
    }

    //6、条件查询
    @Test
    public void testselect(){
        //创建一个条件构造器
        QueryWrapper<SysRole> queryWrapper=new QueryWrapper<>();

        //queryWrapper.eq("role_name","用户管理员");
        queryWrapper.like("role_name","管理员");
        List<SysRole> list = sysRoleMapper.selectList(queryWrapper);
        System.out.println(list);
    }

    //7、条件删除
    @Test
    public void testDelete(){
        QueryWrapper<SysRole> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("role_name","用户管理员");
        sysRoleMapper.delete(queryWrapper);
    }
}
