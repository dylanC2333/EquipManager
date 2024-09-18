package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.common.result.Result;
import com.equipment.model.system.SysEquipmentStock;
import com.equipment.model.vo.SysEquipmentStockQueryVo;
import com.equipment.system.service.SysEquipmentStockService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
@Api(tags = "设备出入库管理接口")
@RestController
@RequestMapping("/admin/equipment/equipmentStock")
public class SysEquipmentStockController {
    @Autowired
    private SysEquipmentStockService sysEquipmentStockService;

    //1 查询所有入库记录
    @ApiOperation("查询所有入库记录接口")
    @GetMapping("findAllIn")
    public Result<List<SysEquipmentStock>> findAllIn(){
        LambdaQueryWrapper<SysEquipmentStock> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysEquipmentStock::getType, "入库");
        List<SysEquipmentStock> list =  sysEquipmentStockService.list(wrapper);
        return Result.ok(list);
    }

    //2 查询所有出库记录
    @ApiOperation("查询所有出库记录接口")
    @GetMapping("findAllOut")
    public Result<List<SysEquipmentStock>> findAllOut(){
        LambdaQueryWrapper<SysEquipmentStock> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysEquipmentStock::getType, "出库");
        List<SysEquipmentStock> list =  sysEquipmentStockService.list(wrapper);
        return Result.ok(list);
    }

    //3 删除记录接口
    @ApiOperation("根据id删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquipStock(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentStockService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //4 条件分页查询入库记录接口
    //page表示当前页 limit每页记录
    @ApiOperation("入库记录条件分页查询")
    @GetMapping("in/{page}/{limit}")
    public Result<IPage<SysEquipmentStock>> findPageQueryEquipIn(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysEquipmentStockQueryVo", value = "查询对象", required = false)
            SysEquipmentStockQueryVo sysEquipmentStockQueryVo){
        //创建page对象
        Page<SysEquipmentStock> pageParam = new Page<>(page,limit);
        // 构造查询条件
        LambdaQueryWrapper<SysEquipmentStock> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysEquipmentStock::getType,"入库");
        if(sysEquipmentStockQueryVo.getKeyword() !=null){
            queryWrapper.and(i -> i.like(SysEquipmentStock::getEquipmentCode, sysEquipmentStockQueryVo.getKeyword())
                            .or().like(SysEquipmentStock::getUserCode, sysEquipmentStockQueryVo.getKeyword())
                            .or().like(SysEquipmentStock::getEquipmentDate, sysEquipmentStockQueryVo.getKeyword())
                            .or().like(SysEquipmentStock::getTaskCode, sysEquipmentStockQueryVo.getKeyword())
                            .or().like(SysEquipmentStock::getWarehouseManagerCode, sysEquipmentStockQueryVo.getKeyword())
            );
        }
        //调用service方法
        IPage<SysEquipmentStock> pageModel = sysEquipmentStockService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //5 条件分页查询出库记录接口
    //page表示当前页 limit每页记录
    @ApiOperation("出库记录条件分页查询")
    @GetMapping("out/{page}/{limit}")
    public Result<IPage<SysEquipmentStock>> findPageQueryEquipOut(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysEquipmentStockQueryVo", value = "查询对象", required = false)
            SysEquipmentStockQueryVo sysEquipmentStockQueryVo){
        //创建page对象
        Page<SysEquipmentStock> pageParam = new Page<>(page,limit);
        // 构造查询条件
        LambdaQueryWrapper<SysEquipmentStock> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SysEquipmentStock::getType,"出库");
        if(sysEquipmentStockQueryVo.getKeyword() !=null){
            queryWrapper.and(i -> i.like(SysEquipmentStock::getEquipmentCode, sysEquipmentStockQueryVo.getKeyword())
                    .or().like(SysEquipmentStock::getUserCode, sysEquipmentStockQueryVo.getKeyword())
                    .or().like(SysEquipmentStock::getEquipmentDate, sysEquipmentStockQueryVo.getKeyword())
                    .or().like(SysEquipmentStock::getTaskCode, sysEquipmentStockQueryVo.getKeyword())
                    .or().like(SysEquipmentStock::getWarehouseManagerCode, sysEquipmentStockQueryVo.getKeyword())
            );
        }
        //调用service方法
        IPage<SysEquipmentStock> pageModel = sysEquipmentStockService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //6 添加设备出入库记录
    @ApiOperation("添加设备出入库记录")
    @PostMapping("save")
    public Result<Void> saveEquipStock(@RequestBody SysEquipmentStock sysEquipmentStock){
        boolean isSuccess = sysEquipmentStockService.save(sysEquipmentStock);
        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //7 根据id查询
    @ApiOperation("根据id查询设备出入库记录")
    @GetMapping("findEquipStockById/{id}")
    public Result<SysEquipmentStock> findEquipStockById(@PathVariable String id) {
        SysEquipmentStock sysEquipmentStock = sysEquipmentStockService.getById(id);
        return Result.ok(sysEquipmentStock);
    }

    //8 修改设备出入库记录
    @ApiOperation("修改设备出入库记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipmentStock sysEquipmentStock) {
        return sysEquipmentStockService.updateById(sysEquipmentStock) ? Result.ok() : Result.fail();
    }

    //9 批量删除
    @ApiOperation("批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        sysEquipmentStockService.removeByIds(ids);
        return Result.ok();
    }
}

