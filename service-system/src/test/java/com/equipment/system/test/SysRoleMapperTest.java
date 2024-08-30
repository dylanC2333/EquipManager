package com.equipment.system.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.model.system.SysRole;
import com.equipment.system.mapper.SysRoleMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class SysRoleMapperTest {

    @Autowired
    private SysRoleMapper sysRoleMapper;
    // 1 查询全部
    @Test
    public void findAll() {
        List<SysRole> list = sysRoleMapper.selectList(null);
        for (SysRole sysRole:list){
            System.out.println(sysRole);
        }
    }
    // 2 添加操作
    @Test
    public void add(){
        SysRole sysRole = new SysRole();
        sysRole.setRoleName("测试角色");
        sysRole.setRoleCode("testManager");
        sysRole.setRoleName("测试角色");
        int rows=sysRoleMapper.insert(sysRole);
        System.out.println(rows);
    }

    // 3 修改操作
//    @Test
//    public void update(){
//        SysRole sysRole = sysRoleMapper.selectById(1);
//        sysRole.setDescription("系统管理员001");
//        sysRoleMapper.updateById(sysRole);
//    }
    @Test
    public void testUpdateById(){
        SysRole sysRole = new SysRole();
        sysRole.setId("1");
        sysRole.setRoleName("系统管理员");

        int result = sysRoleMapper.updateById(sysRole);
        System.out.println(result);

    }
    // 4 根据id删除
    @Test
    public void testDeleteById(){
        int result = sysRoleMapper.deleteById("11");
        System.out.println(result);
    }
    @Test
    public void testDeleteBatchIds(){
        int result = sysRoleMapper.deleteBatchIds(Arrays.asList("12", "13"));
        System.out.println(result);
    }
    // 5 条件查询，注意后期开发需要实现多字段模糊查询。
   @Test
   public void testQueryWrapper(){
        QueryWrapper<SysRole> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("role_name","管理员");
        List<SysRole> user = sysRoleMapper.selectList(queryWrapper);
        System.out.println(user);
   }
   // 6 条件删除，略
}
