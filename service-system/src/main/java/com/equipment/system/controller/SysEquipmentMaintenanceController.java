package com.equipment.system.controller;


import com.equipment.common.result.Result;
import com.equipment.model.vo.SysEquipmentMaintenanceQueryVo;
import com.equipment.model.vo.SysEquipmentTransferQueryVo;
import com.equipment.model.system.SysEquipmentMaintenance;
import com.equipment.system.service.SysEquipmentMaintenanceService;
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
 * @since 2024-08-20
 */
@Api(tags = "设备保养接口")
@RestController
@RequestMapping("/admin/equipment/equipmentMaintenance")
public class SysEquipmentMaintenanceController {

    @Autowired
    private SysEquipmentMaintenanceService sysEquipmentMaintenanceService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result findAll(){
        List<SysEquipmentMaintenance> list =  sysEquipmentMaintenanceService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("根据id物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result removeEquipMaintenance(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentMaintenanceService.removeById(id);
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
    public Result fingPageQueryEquipMaintenance(@PathVariable Long page,
                                             @PathVariable Long limit,
                                             SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo){
        //创建page对象
        Page<SysEquipmentMaintenance> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysEquipmentMaintenance> pageModel = sysEquipmentMaintenanceService.selectPage(pageParam,sysEquipmentMaintenanceQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result saveEquipMaintenance(@RequestBody SysEquipmentMaintenance sysEquipmentMaintenance){
        boolean isSuccess = sysEquipmentMaintenanceService.save(sysEquipmentMaintenance);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("fingEquipMaintenanceById/{id}")
    public Result fingEquipMaintenanceById(@PathVariable String id) {
        SysEquipmentMaintenance sysEquipmentMaintenance = sysEquipmentMaintenanceService.getById(id);
        return Result.ok(sysEquipmentMaintenance);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result updateEquipMaintenance(@RequestBody SysEquipmentMaintenance sysEquipmentMaintenance){
        boolean isSuccess = sysEquipmentMaintenanceService.updateById(sysEquipmentMaintenance);
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
        sysEquipmentMaintenanceService.removeByIds(ids);
        return Result.ok();
    }

}

