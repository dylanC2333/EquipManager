package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.system.SysUser;
import com.equipment.model.vo.SysTaskQueryVo;
import com.equipment.model.system.SysTask;
import com.equipment.model.vo.SysUserQueryVo;
import com.equipment.system.service.SysTaskService;
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
    public Result<Void> removeTask(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysTaskService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //2 条件分页排序查询
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysTask>> findPageQuerySysUser(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysTaskQueryVo sysTaskQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysTask> pageParam = new Page<>(page,limit);
        // 构建查询条件
        QueryWrapper<SysTask> queryWrapper = new QueryWrapper<>();
        if(sysTaskQueryVo.getKeyword() != null){
            queryWrapper.like("task_code",sysTaskQueryVo.getKeyword())
                    .or().like("location",sysTaskQueryVo.getKeyword());
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
        IPage<SysTask> pageModel = sysTaskService.page(pageParam,queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加任务")
    @PostMapping("save")
    public Result<Void> saveTask(@RequestBody SysTask sysTask){
        boolean isSuccess = sysTaskService.save(sysTask);
        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备")
    @GetMapping("findTaskById/{id}")
    public Result<SysTask> findTaskById(@PathVariable String id) {
        SysTask sysTask = sysTaskService.getById(id);
        return Result.ok(sysTask);
    }

    //6 修改任务
    @ApiOperation("修改任务")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysTask sysTask) {
        return sysTaskService.updateById(sysTask) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        sysTaskService.removeByIds(ids);
        return Result.ok();
    }

}

