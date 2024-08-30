package com.equipment.system.controller;


import com.equipment.common.result.Result;
import com.equipment.model.vo.SysEquipmentExportQueryVo;
import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.system.SysEquipmentIntake;
import com.equipment.system.service.SysEquipmentIntakeService;
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
@Api(tags = "设备入库接口")
@RestController
@RequestMapping("/admin/equipment/equipmentIntake")
public class SysEquipmentIntakeController {

    @Autowired
    private SysEquipmentIntakeService sysEquipmentIntakeService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result findAll(){
        List<SysEquipmentIntake> list =  sysEquipmentIntakeService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("根据id物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result removeEquipIntake(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentIntakeService.removeById(id);
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
    public Result fingPageQueryEquipIntake(@PathVariable Long page,
                                        @PathVariable Long limit,
                                        SysEquipmentIntakeQueryVo sysEquipmentIntakeQueryVo){
        //创建page对象
        Page<SysEquipmentIntake> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysEquipmentIntake> pageModel = sysEquipmentIntakeService.selectPage(pageParam,sysEquipmentIntakeQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result saveEquipIntake(@RequestBody SysEquipmentIntake sysEquipmentIntake){
        boolean isSuccess = sysEquipmentIntakeService.save(sysEquipmentIntake);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("fingEquipIntakeById/{id}")
    public Result fingEquipIntakeById(@PathVariable String id) {
        SysEquipmentIntake sysEquipmentIntake = sysEquipmentIntakeService.getById(id);
        return Result.ok(sysEquipmentIntake);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result updateEquipIntake(@RequestBody SysEquipmentIntake sysEquipmentIntake){
        boolean isSuccess = sysEquipmentIntakeService.updateById(sysEquipmentIntake);
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
        sysEquipmentIntakeService.removeByIds(ids);
        return Result.ok();
    }
}

