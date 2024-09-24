package com.equipment.system.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysUser;
import com.equipment.system.mapper.SysUserMapper;
import com.equipment.system.service.SysUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class SysUserMapperTest {

    @Autowired
    private SysUserMapper sysRoleMapper;
    @Autowired
    private SysUserService sysUserService;
    // 1 查询全部
    @Test
    public void findAll() {
        List<SysUser> list = sysRoleMapper.selectList(null);
        for (SysUser sysUser : list) {
            System.out.println(sysUser);
        }
    }

    @Test
    public void findPageQuerySysUser() {
        Page<SysUser> pageParam = new Page<>(1, 3);
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("username","wang");
//        queryWrapper.orderByDesc("username");
        IPage<SysUser> pageModel = sysUserService.page(pageParam, queryWrapper);
        System.out.print(pageModel.getRecords());
    }

    @Test
    public void getUserListByRoleName(){
        List<SysUser> list = null;
        list = sysUserService.getUserListByRoleName("设备使用人员");
        System.out.println(list);
    }
}
