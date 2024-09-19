package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.system.SysUser;
import com.equipment.model.vo.SysEquipmentUseQueryVo;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.system.service.SysEquipmentUseService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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

    //3 条件分页排序查询
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysEquipmentUse>> findPageQueryEquipIntake(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable Long page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable Long limit,

            @ApiParam(name = "SysEquipmentUseQueryVo", value = "查询对象", required = false)
            SysEquipmentUseQueryVo sysEquipmentUseQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysEquipmentUse> pageParam = new Page<>(page,limit);
        // 构造查询条件
        QueryWrapper<SysEquipmentUse> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentUseQueryVo.getKeyword() !=null){
            queryWrapper.like("equipment_code",sysEquipmentUseQueryVo.getKeyword())
                    .or().like("employee_use_code",sysEquipmentUseQueryVo.getKeyword())
                    .or().like("location",sysEquipmentUseQueryVo.getKeyword())
                    .or().like("task_code",sysEquipmentUseQueryVo.getKeyword());
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
    @GetMapping("findEquipUseById/{id}")
    public Result<SysEquipmentUse> findEquipUseById(@PathVariable String id) {
        SysEquipmentUse sysEquipmentUse = sysEquipmentUseService.getById(id);
        return Result.ok(sysEquipmentUse);
    }

    //6、修改记录
    @ApiOperation("修改记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipmentUse sysEquipmentUse) {
        return sysEquipmentUseService.updateById(sysEquipmentUse) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysEquipmentUseService.removeByIds(ids) ? Result.ok(): Result.fail();
    }
}

