package com.equipment.system.controller;



import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.equipment.common.result.Result;
import com.equipment.common.utils.NamingUtils;
import com.equipment.model.view.ViewTransferNameQuery;
import com.equipment.model.vo.SysEquipmentTransferQueryVo;
import com.equipment.model.system.SysEquipmentTransfer;
import com.equipment.model.vo.SysUserQueryVo;
import com.equipment.system.service.SysEquipmentTransferService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.system.service.ViewTransferNameQueryService;
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
 * @since 2024-08-19
 */
@Api(tags = "设备交接接口")
@RestController
@RequestMapping("/admin/equipment/equipmentTransfer")
public class SysEquipmentTransferController {

    @Autowired
    private ViewTransferNameQueryService viewTransferNameQueryService;

    @Autowired
    private SysEquipmentTransferService sysEquipmentTransferService;

    //1、查询所有记录
    @ApiOperation("查询所有记录接口")
    @GetMapping("findAll")
    public Result<List<SysEquipmentTransfer>> findAll(){
        List<SysEquipmentTransfer> list =  sysEquipmentTransferService.list();
        return Result.ok(list);
    }

    //2、物理删除接口
    @ApiOperation("根据id物理删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeEquipTransfer(@PathVariable Long id){
        //调用方法删除
        boolean isSuccess = sysEquipmentTransferService.removeById(id);
        if(isSuccess ){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //3 条件分页排序查询
    //page表示当前页 limit每页记录
    @ApiOperation("条件排序分页查询")
    @GetMapping("{page}/{limit}/{column}/{order}")
    public Result<IPage<SysEquipmentTransfer>> findPageQueryEquipTransfer(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<SysEquipmentTransfer> pageParam = new Page<>(page,limit);
        //构造查询条件
        QueryWrapper<SysEquipmentTransfer> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentTransferQueryVo.getStartTime()!=null && sysEquipmentTransferQueryVo.getEndTime()!=null){
            queryWrapper.between("transfer_date",sysEquipmentTransferQueryVo.getStartTime(),sysEquipmentTransferQueryVo.getEndTime());
        }
        if(sysEquipmentTransferQueryVo.getKeyword() !=null){
            queryWrapper.and(wrapper->
                    wrapper.like("equipment_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("transfer_location",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("transfer_date",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("deliver_employee_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("receiver_employee_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("old_task_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("new_task_code",sysEquipmentTransferQueryVo.getKeyword())
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
        IPage<SysEquipmentTransfer> pageModel = sysEquipmentTransferService.page(pageParam, queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4 带姓名条件分页排序查询
    @ApiOperation("条件排序分页查询带姓名")
    @GetMapping("name/{page}/{limit}/{column}/{order}")
    public Result<IPage<ViewTransferNameQuery>> findPageQueryEquipTransferName(

            @ApiParam(name = "page", value = "当前页码", required = true)
            @PathVariable int page,

            @ApiParam(name = "limit", value = "每页记录数量", required = true)
            @PathVariable int limit,

            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
            SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo,

            @ApiParam(name = "column", value = "字段", required = false)
            @PathVariable String column,

            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
            @PathVariable String order
    ){
        //创建page对象
        Page<ViewTransferNameQuery> pageParam = new Page<>(page,limit);
        //构造查询条件
        QueryWrapper<ViewTransferNameQuery> queryWrapper = new QueryWrapper<>();
        if(sysEquipmentTransferQueryVo.getStartTime()!=null && sysEquipmentTransferQueryVo.getEndTime()!=null){
            queryWrapper.between("transfer_date",sysEquipmentTransferQueryVo.getStartTime(),sysEquipmentTransferQueryVo.getEndTime());
        }
        if(sysEquipmentTransferQueryVo.getKeyword() !=null){
            queryWrapper.and(wrapper->
                    wrapper.like("equipment_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("transfer_location",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("transfer_date",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("deliver_employee_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("receiver_employee_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("old_task_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("new_task_code",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("deliver_employee_name",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("receiver_employee_name",sysEquipmentTransferQueryVo.getKeyword())
                            .or().like("equipment_name",sysEquipmentTransferQueryVo.getKeyword())
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
        IPage<ViewTransferNameQuery> pageModel = viewTransferNameQueryService.page(pageParam, queryWrapper);
        //返回
        return  Result.ok(pageModel);
    }

    //4、添加设备
    @ApiOperation("添加设备入库记录")
    @PostMapping("save")
    public Result<Void> saveEquipTransfer(@RequestBody SysEquipmentTransfer sysEquipmentTransfer){
        boolean isSuccess = sysEquipmentTransferService.save(sysEquipmentTransfer);

        if(isSuccess){
            return Result.ok();
        }else{
            return Result.fail();
        }
    }

    //5、根据id查询
    @ApiOperation("根据id查询设备入库记录")
    @GetMapping("findEquipTransferById/{id}")
    public Result<SysEquipmentTransfer> findEquipTransferById(@PathVariable String id) {
        SysEquipmentTransfer sysEquipmentTransfer = sysEquipmentTransferService.getById(id);
        return Result.ok(sysEquipmentTransfer);
    }

    //8 修改设备出入库记录
    @ApiOperation("修改设备出入库记录")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysEquipmentTransfer sysEquipmentTransfer) {
        return sysEquipmentTransferService.updateById(sysEquipmentTransfer) ? Result.ok() : Result.fail();
    }

    //7、批量删除
    @ApiOperation("物理批量删除")
    @DeleteMapping("batchRemove")
    public Result<Void> batchRemove(@RequestBody List<Long> ids){
        return sysEquipmentTransferService.removeByIds(ids) ? Result.ok() : Result.fail();
    }

}

