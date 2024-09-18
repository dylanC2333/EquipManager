package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.model.system.SysEquipmentMaintenance;
import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.vo.SysEquipmentUseQueryVo;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.system.service.SysEquipmentUseService;
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
 * @since 2024-08-01
 */
@Api(tags = "设备使用接口")
@RestController
@RequestMapping("/admin/equipment/equipmentUse")
public class SysEquipmentUseController {
    @Autowired
    private SysEquipmentUseService sysEquipmentUseService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysEquipmentUse>> findAll(){
        List<SysEquipmentUse> list =  sysEquipmentUseService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("根据id物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquipIntake(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentUseService.removeById(id);
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
    public Result<IPage<SysEquipmentUse>> fingPageQueryEquipIntake(@PathVariable Long page,
                                           @PathVariable Long limit,
                                           SysEquipmentUseQueryVo sysEquipmentUseQueryVo){
        //创建page对象
        Page<SysEquipmentUse> pageParam = new Page<>(page,limit);
        // 构造查询条件
        LambdaQueryWrapper<SysEquipmentUse> queryWrapper = new LambdaQueryWrapper<>();
        if(sysEquipmentUseQueryVo.getKeyword() !=null){
            queryWrapper.like(SysEquipmentUse::getEquipmentCode,sysEquipmentUseQueryVo.getKeyword())
                    .or().like(SysEquipmentUse::getEmployeeUseCode,sysEquipmentUseQueryVo.getKeyword())
                    .or().like(SysEquipmentUse::getLocation,sysEquipmentUseQueryVo.getKeyword())
                    .or().like(SysEquipmentUse::getTaskCode,sysEquipmentUseQueryVo.getKeyword());
        }
        //调用service方法
        IPage<SysEquipmentUse> pageModel = sysEquipmentUseService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result<Void> saveEquipIntake(@RequestBody SysEquipmentUse sysEquipmentUse){
        boolean isSuccess = sysEquipmentUseService.save(sysEquipmentUse);
        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("fingEquipUseById/{id}")
    public Result<SysEquipmentUse> fingEquipUseById(@PathVariable String id) {
        SysEquipmentUse sysEquipmentUse = sysEquipmentUseService.getById(id);
        return Result.ok(sysEquipmentUse);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result<Void> updateEquipUse(@RequestBody SysEquipmentUse sysEquipmentUse){
        boolean isSuccess = sysEquipmentUseService.updateById(sysEquipmentUse);
        if(isSuccess){
            return Result.ok();
        }  else {
            return Result.fail();
        }
    }

    //7、批量删除
    @ApiOperation("批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        sysEquipmentUseService.removeByIds(ids);
        return Result.ok();
    }
}

