package com.equipment.system.controller;

import com.equipment.common.result.Result;
import com.equipment.model.system.SysMenu;
import com.equipment.model.vo.AssignMenuVo;
import com.equipment.system.service.SysMenuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "菜单管理")
@RestController
@RequestMapping("/admin/system/sysMenu")
public class SysMenuController {

    @Autowired
    private SysMenuService sysMenuService;

    //获取角色的菜单
    @ApiOperation("根据角色获取菜单")
    @GetMapping("toAssign/{roleId}")
    public Result<List<SysMenu>> toAssign(@PathVariable String roleId) {
        List<SysMenu> list = sysMenuService.findSysMenuByRoleId(roleId);
        return Result.ok(list);
    }

    //给角色分配菜单
    @ApiOperation("给角色分配菜单权限")
    @PostMapping("doAssign")
    public Result<Void> doAssign(@RequestBody AssignMenuVo assignMenuVo) {
        return sysMenuService.doAssign(assignMenuVo) ? Result.ok():Result.fail();
    }

    //菜单列表（树形）
    @ApiOperation("菜单列表")
    @GetMapping("findNodes")
    public Result<List<SysMenu>> findNodes() {
        List<SysMenu> list = sysMenuService.findNodes();
        return Result.ok(list);
    }

    //添加菜单
    @ApiOperation("添加菜单")
    @PostMapping("save")
    public Result<Void> save(@RequestBody SysMenu sysMenu) {
        return sysMenuService.save(sysMenu) ? Result.ok(): Result.fail();
    }

    //根据id查询
    @ApiOperation("根据id查询菜单")
    @GetMapping("findNode/{id}")
    public Result<SysMenu> findNode(@PathVariable String id) {
        SysMenu sysMenu = sysMenuService.getById(id);
        return Result.ok(sysMenu);
    }

    //修改菜单
    @ApiOperation("修改菜单")
    @PutMapping("update")
    public Result<Void> update(@RequestBody SysMenu sysMenu) {
        return sysMenuService.updateById(sysMenu) ? Result.ok(): Result.fail();
    }

    //删除菜单
    @ApiOperation("删除菜单")
    @DeleteMapping("remove/{id}")
    public Result<Void> remove(@PathVariable String id) {
        return sysMenuService.removeMenuById(id) ? Result.ok() : Result.fail();
    }
}
