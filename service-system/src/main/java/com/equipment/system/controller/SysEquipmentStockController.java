package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.system.SysEquipmentStock;
import com.equipment.model.view.ViewStockNameQuery;
import com.equipment.model.vo.SysEquipmentStockQueryVo;
import com.equipment.model.vo.SysIdleEquipmentFinderQueryVo;
import com.equipment.system.service.SysEquipmentStockService;
import com.equipment.system.service.ViewStockNameQueryService;
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
    private ViewStockNameQueryService viewStockNameQueryService;

    @Autowired
    private SysEquipmentStockService sysEquipmentStockService;


    //1 查询所有出入库记录
    @ApiOperation("查询所有出入库记录接口")
    @GetMapping("findAll")
    public Result<List<SysEquipmentStock>> findAll(){
        List<SysEquipmentStock> list =  sysEquipmentStockService.list();
        return Result.ok(list);
    }

    //2 删除记录接口
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

    //3 条件分页查询出入库记录接口
    //page表示当前页 limit每页记录
    @ApiOperation("出入库记录条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysEquipmentStock>> findPageQueryEquipUse(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysEquipmentStockQueryVo", value = "查询对象", required = false)
            SysEquipmentStockQueryVo sysEquipmentStockQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysEquipmentStock> pageParam = new Page<>(page,limit);
        // 构造查询条件
        QueryWrapper<SysEquipmentStock> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentStockQueryVo.getStartTime()!=null && sysEquipmentStockQueryVo.getEndTime()!=null){
            queryWrapper.between("equipment_date",sysEquipmentStockQueryVo.getStartTime(),sysEquipmentStockQueryVo.getEndTime());
        }
        if(sysEquipmentStockQueryVo.getKeyword() !=null){
            queryWrapper.and(i -> i.like("equipment_code", sysEquipmentStockQueryVo.getKeyword())
                    .or().like("user_code", sysEquipmentStockQueryVo.getKeyword())
                    .or().like("equipment_date", sysEquipmentStockQueryVo.getKeyword())
                    .or().like("task_code", sysEquipmentStockQueryVo.getKeyword())
                    .or().like("warehouse_manager_code", sysEquipmentStockQueryVo.getKeyword())
                    .or().eq("type", sysEquipmentStockQueryVo.getKeyword())
            );
        }
        //构造排序条件
        if (column != null && order != null) {
            String field = NamingUtils.camelToUnderline(column);
            if (order.equals("ascending")) {
                queryWrapper.orderByAsc(field);
            } else {
                queryWrapper.orderByDesc(field);
            }
        }
        //调用service方法
        IPage<SysEquipmentStock> pageModel = sysEquipmentStockService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4 条件分页查询出入库记录接口带姓名
    //page表示当前页 limit每页记录
    @ApiOperation("出入库记录条件排序分页查询带姓名")
    @GetMapping("name/{page}/{limit}/{column}/{order}")
    public Result<IPage<ViewStockNameQuery>> findPageQueryEquipUseName(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysEquipmentStockQueryVo", value = "查询对象", required = false)
            SysEquipmentStockQueryVo sysEquipmentStockQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<ViewStockNameQuery> pageParam = new Page<>(page,limit);
        // 构造查询条件
        QueryWrapper<ViewStockNameQuery> queryWrapper = new QueryWrapper<>();
        // 首先过滤is_transfer=0，虚拟出入库的记录，使其不显示。
        queryWrapper.ne("is_transfer", 0);
        if(sysEquipmentStockQueryVo.getStartTime()!=null && sysEquipmentStockQueryVo.getEndTime()!=null){
            queryWrapper.between("equipment_date",sysEquipmentStockQueryVo.getStartTime(),sysEquipmentStockQueryVo.getEndTime());
        }
        if(sysEquipmentStockQueryVo.getKeyword() !=null){
            queryWrapper.and(wrapper->
                    wrapper.like("equipment_code", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("user_code", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("task_code", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("warehouse_manager_code", sysEquipmentStockQueryVo.getKeyword())
                            .or().eq("type", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("user_name", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("warehouse_manager_name", sysEquipmentStockQueryVo.getKeyword())
                            .or().like("equipment_name", sysEquipmentStockQueryVo.getKeyword())
            );
        }
        //构造排序条件
        if (column != null && order != null) {
            String field = NamingUtils.camelToUnderline(column);
            if (order.equals("ascending")) {
                queryWrapper.orderByAsc(field);
            } else {
                queryWrapper.orderByDesc(field);
            }
        }
        //调用service方法
        IPage<ViewStockNameQuery> pageModel = viewStockNameQueryService.page(pageParam,queryWrapper);
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

    //8、查询空闲设备列表: 在库设备
    @ApiOperation("查询空闲设备列表: 在库设备")
    @GetMapping("idleEquipmentFinder/{page}/{limit}")
    public Result<IPage<SysEquipmentStock>> idleEquipmentFinder(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysIdleEquipmentFinderQueryVo", value = "查询对象", required = false)
            SysIdleEquipmentFinderQueryVo sysIdleEquipmentFinderQueryVo){
        //创建page对象
        Page<SysEquipmentStock> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysEquipmentStock> pageModel = sysEquipmentStockService.idleEquipmentFinder(pageParam,sysIdleEquipmentFinderQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    //9、查询空闲设备列表: 出库设备且任务地在搜索条件内
    @ApiOperation("查询空闲设备列表: 出库设备且任务地在搜索条件内,无使用记录")
    @GetMapping("idleEquipmentFinder2/{page}/{limit}")
    public Result idleEquipmentFinder2(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysIdleEquipmentFinderQueryVo", value = "查询对象", required = false)
            SysIdleEquipmentFinderQueryVo sysIdleEquipmentFinderQueryVo){
        //创建page对象
        Page<SysEquipmentStock> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysEquipmentStock> pageModel = sysEquipmentStockService.idleEquipmentFinder2(pageParam,sysIdleEquipmentFinderQueryVo);
        //返回
        return  Result.ok(pageModel);
    }
}

