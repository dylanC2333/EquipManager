package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.vo.*;
import com.equipment.model.system.SysEquipment;
import com.equipment.system.service.SysEquipmentService;
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
 * @since 2024-07-28
 */
@Api(tags = "设备管理接口")
@RestController
@RequestMapping("/admin/system/sysEquip")
public class SysEquipmentController {
    @Autowired
    private SysEquipmentService sysEquipmentService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysEquipment>> findAll(){
        List<SysEquipment> list =  sysEquipmentService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquip(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //3、条件分页排序查询
    //page表示当前页 limit每页记录
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysEquipment>> findPageQueryEquip(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipQueryVo sysEquipQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysEquipment> pageParam = new Page<>(page,limit);
        //构造查询条件
        QueryWrapper<SysEquipment> queryWrapper = new QueryWrapper<>();
        if(sysEquipQueryVo.getKeyword() != null){
            queryWrapper.like("equipment_name",sysEquipQueryVo.getKeyword())
                    .or().like("equipment_code",sysEquipQueryVo.getKeyword());
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
        IPage<SysEquipment> pageModel = sysEquipmentService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备")
    @PostMapping("save")
    public Result<Void> saveEquip(@RequestBody SysEquipment sysEquipment){
        boolean isSuccess = sysEquipmentService.save(sysEquipment);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备")
    @GetMapping("findEquipById/{id}")
    public Result<SysEquipment> findEquipById(@PathVariable String id) {
        SysEquipment sysEquipment = sysEquipmentService.getById(id);
        return Result.ok(sysEquipment);
    }

    // 6 修改用户
    @ApiOperation("修改用户")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipment sysEquipment) {
        return sysEquipmentService.updateById(sysEquipment) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysEquipmentService.removeByIds(ids)?Result.ok():Result.fail();
    }

    //8、 通过设备编号查询统计设备在一段时间使用的天数，包括真假的记录
    @ApiOperation("通过设备编号查询统计设备在一段时间使用的天数，包括真假的记录")
    @GetMapping("EquipmentUseDayCount/{page}/{limit}")
    public Result<IPage<EquipmentUseDayCount>> EquipmentUseDayCount(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysTaskDeviceQueryVo", value = "查询对象", required = false)
            UserIDAndDateRageVo sysTaskDeviceQueryVo){// UserIDAndDateRageVo依旧使用，因为字段是一样的
        //创建page对象
        Page<EquipmentUseDayCount> pageParam = new Page<>(page,limit);

        //调用service方法,不用管下面的函数名字，因为后来进行了修改，为了方便没有再修改名字
        IPage<EquipmentUseDayCount> pageModel = sysEquipmentService.EquipmentUseDaysCount(pageParam,sysTaskDeviceQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

}

