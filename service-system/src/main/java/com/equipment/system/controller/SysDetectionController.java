package com.equipment.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.view.ViewDetectionNameQuery;
import com.equipment.model.view.ViewTaskUserEquipQuery;
import com.equipment.model.vo.StatisticTaskAndDetection;
import com.equipment.model.vo.SysDetectionDateBatchSaveVo;
import com.equipment.model.vo.SysEquipmentDetectionQueryVo;
import com.equipment.model.vo.UserIDAndDateRageVo;
import com.equipment.model.system.SysDetection;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.system.service.SysDetectionService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.system.service.ViewDetectionNameQueryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author atguigu
 * @since 2024-08-21
 */
@Api(tags = "检测记录接口")
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
    @ApiOperation("根据id查询检测记录")
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

    //9、 员工打卡次数和经历任务数查询
    @ApiOperation("员工打卡次数和经历任务数查询")
    @GetMapping("UserDetectionCount/{page}/{limit}")
    public Result<IPage<ViewDetectionNameQuery>> UserDetectionCount(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysTaskDeviceQueryVo", value = "查询对象", required = false)
            UserIDAndDateRageVo sysTaskDeviceQueryVo){
        //创建page对象
        Page<ViewDetectionNameQuery> pageParam = new Page<>(page,limit);
        // 构造条件
        QueryWrapper<ViewDetectionNameQuery> r = new QueryWrapper<>();
        if (sysTaskDeviceQueryVo.getKeyword() != null) {
            r.eq("employee_code", sysTaskDeviceQueryVo.getKeyword())
             .eq("is_additional",0).eq("is_deleted",0);
            r.orderByDesc("start_date");
        }
        // 添加日期范围条件
        String startDateStr = sysTaskDeviceQueryVo.getStart();
        String endDateStr = sysTaskDeviceQueryVo.getEnd();
        // 定义日期格式
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // 根据您的日期格式进行调整
        try {
            if (startDateStr != null && endDateStr != null) {
                // 将字符串转换为日期
                Date startDate = dateFormat.parse(startDateStr);
                Date endDate = dateFormat.parse(endDateStr);

                // 生成日期范围查询条件
                r.between("start_date", startDate, endDate);
            }
        } catch (ParseException e) {
            e.printStackTrace(); // 处理解析异常
        }
        //调用service方法,不用管下面的函数名字，因为后来进行了修改，为了方便没有再修改名字
        IPage<ViewDetectionNameQuery> pageModel = viewDetectionNameQueryService.page(pageParam,r);
        //返回
        return  Result.ok(pageModel);
    }

    //9、 员工打卡次数和经历任务数查询领导版
    @ApiOperation("员工打卡次数和经历任务数查询领导版")
    @GetMapping("UserDetectionCountForBoss/{page}/{limit}")
    public Result<IPage<StatisticTaskAndDetection>> UserDetectionCountForBoss(
            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysTaskDeviceQueryVo", value = "查询对象", required = false)
            UserIDAndDateRageVo sysTaskDeviceQueryVo){
        //创建page对象
        Page<StatisticTaskAndDetection> pageParam = new Page<>(page,limit);

        //调用service方法,不用管下面的函数名字，因为后来进行了修改，为了方便没有再修改名字
        IPage<StatisticTaskAndDetection> pageModel = viewDetectionNameQueryService.UserDetectionCountForBoss(pageParam,sysTaskDeviceQueryVo);
        //返回
        return  Result.ok(pageModel);
    }

    // 10 查询用户日期最新的一条检测记录
    @ApiOperation("根据用户编号查询日期最新的一条检测记录")
    @GetMapping("findLastOne/{employeeCode}")
    public Result<SysDetection> findLastOne(@PathVariable String employeeCode) {
        SysDetection lastOne =  sysDetectionService.getLastOne(employeeCode);
        return Result.ok(lastOne);
    }

    // 11 自动补充日期批量插入检测记录
    @ApiOperation("自动补充日期批量插入检测记录")
    @PostMapping("batchSaveDate")
    public Result<Void> batchSaveDate(@RequestBody SysDetectionDateBatchSaveVo sysDetectionDateBatchSaveVo) {
        return sysDetectionService.dateBatchSupplement(sysDetectionDateBatchSaveVo) ? Result.ok() : Result.fail();
    }
}

