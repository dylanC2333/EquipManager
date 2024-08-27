package com.atguigu.system.controller;


import com.atguigu.common.result.Result;
import com.atguigu.model.vo.SysEquipQueryVo;
import com.atguigu.model.vo.SysEquipmentDetectionQueryVo;
import com.atguigu.system.entity.SysDetection;
import com.atguigu.system.entity.SysEquipment;
import com.atguigu.system.service.SysDetectionService;
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
 * @since 2024-08-21
 */
@Api(tags = "设备检测接口")
@RestController
@RequestMapping("/admin/system/sysEquipDetection")
public class SysDetectionController {

    @Autowired
    private SysDetectionService sysDetectionService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result findAll(){
        List<SysDetection> list =  sysDetectionService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result removeEquip(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysDetectionService.removeById(id);
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
    public Result fingPageQueryEquip(@PathVariable Long page,
                                     @PathVariable Long limit,
                                     SysEquipmentDetectionQueryVo sysEquipmentDetectionQueryVo){
        //创建page对象
        Page<SysDetection> pageParam = new Page<>(page,limit);
        //调用service方法
        IPage<SysDetection> pageModel = sysDetectionService.selectPage(pageParam,sysEquipmentDetectionQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备检测")
    @PostMapping("save")
    public Result saveEquip(@RequestBody SysDetection sysDetection){
        boolean isSuccess = sysDetectionService.save(sysDetection);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备检测")
    @GetMapping("fingDetectionById/{id}")
    public Result fingDetectionById(@PathVariable String id) {
        SysDetection sysDetection = sysDetectionService.getById(id);
        return Result.ok(sysDetection);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result updateEquip(@RequestBody SysDetection sysDetection){
        boolean isSuccess = sysDetectionService.updateById(sysDetection);
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
        sysDetectionService.removeByIds(ids);
        return Result.ok();
    }
}

