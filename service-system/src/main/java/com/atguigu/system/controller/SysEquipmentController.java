package com.atguigu.system.controller;


import com.atguigu.common.result.Result;
import com.atguigu.model.system.SysMenu;
import com.atguigu.model.system.SysRole;
import com.atguigu.model.vo.SysEquipQueryVo;
import com.atguigu.model.vo.SysRoleQueryVo;
import com.atguigu.system.entity.SysEquipment;
import com.atguigu.system.service.SysEquipmentService;
import com.atguigu.system.service.SysRoleService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
@Api(tags = "设备管理接口")
@RestController
@RequestMapping("/admin/system/sysEquip")
public class SysEquipmentController {
    @Autowired
    private SysEquipmentService sysEquipmentService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result findAll(){
        List<SysEquipment > list =  sysEquipmentService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result removeEquip(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //3、条件分页查询接口
    //page表示当前页 limit每页记录
    @ApiOperation("条件分页查询")
    @GetMapping("{page}/{limit}")
    public Result fingPageQueryEquip(@PathVariable Long page,
                                    @PathVariable Long limit,
                                    SysEquipQueryVo sysEquipQueryVo){
        //创建page对象
        Page<SysEquipment> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysEquipment> pageModel = sysEquipmentService.selectPage(pageParam,sysEquipQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备")
    @PostMapping("save")
    public Result saveEquip(@RequestBody SysEquipment sysEquipment){
        boolean isSuccess = sysEquipmentService.save(sysEquipment);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备")
    @GetMapping("fingEquipById/{id}")
    public Result fingEquipById(@PathVariable String id) {
        SysEquipment sysEquipment = sysEquipmentService.getById(id);
        return Result.ok(sysEquipment);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result updateEquip(@RequestBody SysEquipment sysEquipment){
        boolean isSuccess = sysEquipmentService.updateById(sysEquipment);
        if(isSuccess){
            return Result.ok();
        }  else {
            return Result.fail();
        }
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result batchRemove(@RequestBody List<Long> ids){
        sysEquipmentService.removeByIds(ids);
        return Result.ok();
    }



}

