package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.model.system.SysRole;
import com.equipment.model.vo.SysTaskQueryVo;
import com.equipment.model.system.SysTask;
import com.equipment.system.service.SysTaskService;
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
 * @since 2024-07-28
 */
@Api(tags = "任务管理接口")
@RestController
@RequestMapping("/admin/system/sysTask")
public class SysTaskController {
    @Autowired
    private SysTaskService sysTaskService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysTask>> findAll(){
        List<SysTask> list =  sysTaskService.list();
        return Result.ok(list);
    }

    //2、逻辑删除接口
    @ApiOperation("物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result removeTask(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysTaskService.removeById(id);
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
    public Result fingPageQueryTask(@PathVariable Long page,
                                     @PathVariable Long limit,
                                     SysTaskQueryVo sysTaskQueryVo){
        //创建page对象
        Page<SysTask> pageParam = new Page<>(page,limit);
        // 构建查询条件
        LambdaQueryWrapper<SysTask> queryWrapper = new LambdaQueryWrapper<>();
        if(sysTaskQueryVo!=null){
            queryWrapper.like(SysTask::getTaskCode,sysTaskQueryVo.getKeyword())
                    .or().like(SysTask::getLocation,sysTaskQueryVo.getKeyword());
        }
        //调用service方法
        IPage<SysTask> pageModel = sysTaskService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加任务")
    @PostMapping("save")
    public Result saveTask(@RequestBody SysTask sysTask){
        boolean isSuccess = sysTaskService.save(sysTask);
        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备")
    @GetMapping("fingTaskById/{id}")
    public Result fingTaskById(@PathVariable String id) {
        SysTask sysTask = sysTaskService.getById(id);
        return Result.ok(sysTask);
    }

    //6、修改-最终修改
    @ApiOperation("最终修改")
    @PostMapping("update")
    public Result updateTask(@RequestBody SysTask sysTask){
        boolean isSuccess = sysTaskService.updateById(sysTask);
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
        sysTaskService.removeByIds(ids);
        return Result.ok();
    }

}

