package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.model.vo.SysEquipmentDetectionQueryVo;
import com.equipment.model.system.SysDetection;
import com.equipment.system.service.SysDetectionService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.system.service.ViewDetectionNameQueryService;
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
 * @since 2024-08-21
 */
@Api(tags = "检测接口")
@RestController
@RequestMapping("/admin/system/sysEquipDetection")
public class SysDetectionController {

    @Autowired
    private ViewDetectionNameQueryService viewDetectionNameQueryService;

    @Autowired
    private SysDetectionService sysDetectionService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysDetection>> findAll(){
        List<SysDetection> list =  sysDetectionService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquip(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysDetectionService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //3 条件分页排序查询
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysDetection>> findPageQueryEquip(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysDetection> pageParam = new Page<>(page,limit);
        //构造查询条件
        QueryWrapper<SysDetection> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentDetectionQueryVo.getKeyword() !=null){
            queryWrapper.like("employee_code",sysEquipmentDetectionQueryVo.getKeyword())
                    .or().like("detection_location",sysEquipmentDetectionQueryVo.getKeyword())
                    .or().like("task_code",sysEquipmentDetectionQueryVo.getKeyword());
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
        IPage<SysDetection> pageModel = sysDetectionService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }


    //4 带姓名条件分页排序查询
    @ApiOperation("带姓名条件排序分页查询")
    @GetMapping("name/{page}/{limit}/{column}/{order}")
    public Result<IPage<ViewDetectionNameQuery>> findPageQueryDetectionName(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<ViewDetectionNameQuery> pageParam = new Page<>(page,limit);
        //构造查询条件
        QueryWrapper<ViewDetectionNameQuery> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentDetectionQueryVo.getKeyword() !=null){
            queryWrapper.like("employee_code",sysEquipmentDetectionQueryVo.getKeyword())
                    .or().like("detection_location",sysEquipmentDetectionQueryVo.getKeyword())
                    .or().like("task_code",sysEquipmentDetectionQueryVo.getKeyword())
                    .or().like("employee_name",sysEquipmentDetectionQueryVo.getKeyword());
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
        IPage<ViewDetectionNameQuery> pageModel = viewDetectionNameQueryService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //5 添加设备
    @ApiOperation("添加设备检测")
    @PostMapping("save")
    public Result<Void> saveEquip(@RequestBody SysDetection sysDetection){
        boolean isSuccess = sysDetectionService.save(sysDetection);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //6 根据id查询
    @ApiOperation("根据id查询设备检测")
    @GetMapping("findDetectionById/{id}")
    public Result<SysDetection> findDetectionById(@PathVariable String id) {
        SysDetection sysDetection = sysDetectionService.getById(id);
        return Result.ok(sysDetection);
    }

    //7 修改设备出入库记录
    @ApiOperation("修改设备出入库记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysDetection sysDetection) {
        return sysDetectionService.updateById(sysDetection) ? Result.ok() : Result.fail();
    }

    //8 批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysDetectionService.removeByIds(ids) ? Result.ok() : Result.fail();
    }
}

