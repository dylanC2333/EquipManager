package com.atguigu.system.controller;


import com.atguigu.common.result.Result;
import com.atguigu.common.utils.MD5;
import com.atguigu.model.system.SysUser;
import com.atguigu.model.vo.AssginRoleVo;
import com.atguigu.model.vo.SysUserQueryVo;
import com.atguigu.system.service.SysRoleService;
import com.atguigu.system.service.SysUserService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author atguigu
 * @since 2024-07-20
 */
@Api(tags = "用户管理接口")
@RestController
@RequestMapping("/admin/system/sysUser")
public class SysUserController {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysRoleService sysRoleService;

    @ApiOperation("更改用户状态")
    @GetMapping("updateStatus/{id}/{status}")
    public Result updateStatus(@PathVariable String id,
                               @PathVariable Integer status) {
        sysUserService.updateStatus(id,status);
        return Result.ok();
    }

    @ApiOperation("用户列表")
    @GetMapping("/{page}/{limit}")
    public Result list(@PathVariable Long page,
                       @PathVariable Long limit,
                       SysUserQueryVo sysUserQueryVo) {
        //创建page对象
        Page<SysUser> pageParam = new Page<>(page, limit);
        //调用service方法
        IPage<SysUser> pageModel = sysUserService.selectPage(pageParam,sysUserQueryVo);
        return Result.ok(pageModel);
    }

    @ApiOperation(value = "添加用户")
    @PostMapping("save")
    public Result save(@RequestBody SysUser user) {
        //把输入的密码进行加密 MD5
        String encrypt = MD5.encrypt(user.getPassword());
        user.setPassword(encrypt);
        boolean isSuccess = sysUserService.save(user);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    @ApiOperation("根据id查询")
    @GetMapping("getUser/{id}")
    public Result getUser(@PathVariable String id) {
        SysUser user = sysUserService.getById(id);
        return Result.ok(user);
    }

    @ApiOperation(value = "修改用户")
    @PostMapping("update")
    public Result update(@RequestBody SysUser user) {
        boolean isSuccess = sysUserService.updateById(user);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    @ApiOperation("删除用户")
    @DeleteMapping("remove/{id}")
    public Result removeUser(@PathVariable String id) {
        boolean isSuccess = sysUserService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }

    }






}

