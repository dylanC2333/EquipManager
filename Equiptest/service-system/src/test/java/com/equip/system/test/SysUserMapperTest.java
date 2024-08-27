package com.equip.system.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equip.common.result.Result;
import com.equip.model.system.SysRole;
import com.equip.model.system.SysUser;
import com.equip.model.vo.SysUserQueryVo;
import com.equip.system.mapper.SysUserMapper;
import com.equip.system.service.SysUserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Arrays;
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

}
