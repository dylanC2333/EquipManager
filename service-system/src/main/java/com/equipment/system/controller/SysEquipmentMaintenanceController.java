package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.model.system.SysEquipment;
import com.equipment.model.system.SysEquipmentTransfer;
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
    public Result<List<SysEquipmentMaintenance>> findAll(){
        List<SysEquipmentMaintenance> list =  sysEquipmentMaintenanceService.list();
        return Result.ok(list);
    }

    //2、删除接口
    @ApiOperation("根据id删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquipMaintenance(@PathVariable Long id){
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
    public Result<IPage<SysEquipmentMaintenance>> findPageQueryEquipMaintenance(@PathVariable Long page,
                                             @PathVariable Long limit,
                                             SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo){
        //创建page对象
        Page<SysEquipmentMaintenance> pageParam = new Page<>(page,limit);
        // 构造查询条件
        LambdaQueryWrapper<SysEquipmentMaintenance> queryWrapper = new LambdaQueryWrapper<>();
        if(sysEquipmentMaintenanceQueryVo.getKeyword() !=null){
            queryWrapper.like(SysEquipmentMaintenance::getEquipmentCode,sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like(SysEquipmentMaintenance::getEmployeeCode,sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like(SysEquipmentMaintenance::getMaintenanceStatus,sysEquipmentMaintenanceQueryVo.getKeyword());
        }
        //调用service方法
        IPage<SysEquipmentMaintenance> pageModel = sysEquipmentMaintenanceService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result<Void> saveEquipMaintenance(@RequestBody SysEquipmentMaintenance sysEquipmentMaintenance){
        boolean isSuccess = sysEquipmentMaintenanceService.save(sysEquipmentMaintenance);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("findEquipMaintenanceById/{id}")
    public Result<SysEquipmentMaintenance> findEquipMaintenanceById(@PathVariable String id) {
        SysEquipmentMaintenance sysEquipmentMaintenance = sysEquipmentMaintenanceService.getById(id);
        return Result.ok(sysEquipmentMaintenance);
    }

    //8 修改设备出入库记录
    @ApiOperation("修改设备出入库记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipmentMaintenance sysEquipmentMaintenance) {
        return sysEquipmentMaintenanceService.updateById(sysEquipmentMaintenance) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysEquipmentMaintenanceService.removeByIds(ids) ? Result.ok() : Result.fail();
    }

}

