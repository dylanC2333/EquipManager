package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.view.ViewMaintenanceNameQuery;
import com.equipment.model.vo.SysEquipmentMaintenanceQueryVo;
import com.equipment.model.system.SysEquipmentMaintenance;
import com.equipment.system.service.SysEquipmentMaintenanceService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.system.service.ViewMaintenanceNameQueryService;
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
 * @since 2024-08-20
 */
@Api(tags = "设备保养接口")
@RestController
@RequestMapping("/admin/equipment/equipmentMaintenance")
public class SysEquipmentMaintenanceController {

    @Autowired
    private ViewMaintenanceNameQueryService viewMaintenanceNameQueryService;

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

    //3 条件分页排序查询
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysEquipmentMaintenance>> findPageQueryEquipMaintenance(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysEquipmentMaintenance> pageParam = new Page<>(page,limit);
        // 构造查询条件
        QueryWrapper<SysEquipmentMaintenance> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentMaintenanceQueryVo.getKeyword() !=null){
            queryWrapper.like("equipment_code",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("employee_code",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("before_use_status",sysEquipmentMaintenanceQueryVo.getKeyword());
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
        IPage<SysEquipmentMaintenance> pageModel = sysEquipmentMaintenanceService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4 带姓名条件分页排序查询
    @ApiOperation("条件排序分页查询带姓名")
    @GetMapping("name/{page}/{limit}/{column}/{order}")
    public Result<IPage<ViewMaintenanceNameQuery>> findPageQueryEquipMaintenanceName(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentMaintenanceQueryVo sysEquipmentMaintenanceQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<ViewMaintenanceNameQuery> pageParam = new Page<>(page,limit);
        // 构造查询条件
        QueryWrapper<ViewMaintenanceNameQuery> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentMaintenanceQueryVo.getKeyword() !=null){
            queryWrapper.like("equipment_code",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("employee_code",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("before_use_status",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("employee_name",sysEquipmentMaintenanceQueryVo.getKeyword())
                    .or().like("equipment_name",sysEquipmentMaintenanceQueryVo.getKeyword());
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
        IPage<ViewMaintenanceNameQuery> pageModel = viewMaintenanceNameQueryService.page(pageParam,queryWrapper);
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

