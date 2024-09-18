package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.model.system.SysEquipmentStock;
import com.equipment.model.vo.SysEquipmentTransferQueryVo;
import com.equipment.model.system.SysEquipmentTransfer;
import com.equipment.system.service.SysEquipmentTransferService;
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
 * @since 2024-08-19
 */
@Api(tags = "设备交接接口")
@RestController
@RequestMapping("/admin/equipment/equipmentTransfer")
public class SysEquipmentTransferController {

    @Autowired
    private SysEquipmentTransferService sysEquipmentTransferService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysEquipmentTransfer>> findAll(){
        List<SysEquipmentTransfer> list =  sysEquipmentTransferService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("根据id物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquipTransfer(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentTransferService.removeById(id);
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
    public Result<IPage<SysEquipmentTransfer>> findPageQueryEquipTransfer(@PathVariable Long page,
                                           @PathVariable Long limit,
                                           SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo){
        //创建page对象
        Page<SysEquipmentTransfer> pageParam = new Page<>(page,limit);
        //构造查询条件
        LambdaQueryWrapper<SysEquipmentTransfer> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if(sysEquipmentTransferQueryVo.getKeyword() !=null){
            lambdaQueryWrapper.like(SysEquipmentTransfer::getEquipmentCode,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getTransferLocation,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getTransferDate,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getDeliverEmployeeCode,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getReceiverEmployeeCode,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getNewTaskCode,sysEquipmentTransferQueryVo.getKeyword())
                    .or().like(SysEquipmentTransfer::getOldTaskCode,sysEquipmentTransferQueryVo.getKeyword());
        }
        //调用service方法
        IPage<SysEquipmentTransfer> pageModel = sysEquipmentTransferService.page(pageParam,lambdaQueryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result<Void> saveEquipTransfer(@RequestBody SysEquipmentTransfer sysEquipmentTransfer){
        boolean isSuccess = sysEquipmentTransferService.save(sysEquipmentTransfer);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("findEquipTransferById/{id}")
    public Result<SysEquipmentTransfer> findEquipTransferById(@PathVariable String id) {
        SysEquipmentTransfer sysEquipmentTransfer = sysEquipmentTransferService.getById(id);
        return Result.ok(sysEquipmentTransfer);
    }

    //8 修改设备出入库记录
    @ApiOperation("修改设备出入库记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipmentTransfer sysEquipmentTransfer) {
        return sysEquipmentTransferService.updateById(sysEquipmentTransfer) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysEquipmentTransferService.removeByIds(ids) ? Result.ok() : Result.fail();
    }

}

