//package com.equipment.system.controller;
//
//
//import com.equipment.common.result.Result;
//import com.equipment.model.vo.SysEquipmentExportQueryVo;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
///**
// * <p>
// *  前端控制器
// * </p>
// *
// * @author atguigu
// * @since 2024-07-31
// */
//@Api(tags = "设备出库接口")
//@RestController
//@RequestMapping("/admin/equipment/equipmentExport")
//public class SysEquipmentExportController {
//    @Autowired
//    private SysEquipmentExportService sysEquipmentExportService;
//
//    //1、查询所有记录
//    @ApiOperation("查询所有记录接口")
//    @GetMapping("findAll")
//    public Result findAll(){
//        List<SysEquipmentExport> list =  sysEquipmentExportService.list();
//        return Result.ok(list);
//    }
//
//    //2、物理删除接口
//    @ApiOperation("根据id物理删除接口")
//    @DeleteMapping("remove/{id}")
//    public Result removeEquipExp(@PathVariable Long id){
//        //调用方法删除
//        boolean isSuccess = sysEquipmentExportService.removeById(id);
//        if(isSuccess ){
//            return Result.ok();
//        }else{
//            return Result.fail();
//        }
//    }
//
//    //3、条件分页查询接口
//    //page表示当前页 limit每页记录
//    @ApiOperation("条件分页查询")
//    @GetMapping("{page}/{limit}")
//    public Result fingPageQueryEquipExp(@PathVariable Long page,
//                                     @PathVariable Long limit,
//                                     SysEquipmentExportQueryVo sysEquipmentExportQueryVo){
//        //创建page对象
//        Page<SysEquipmentExport> pageParam = new Page<>(page,limit);
//        //调用service方法
//        IPage<SysEquipmentExport> pageModel = sysEquipmentExportService.selectPage(pageParam,sysEquipmentExportQueryVo);
//        //返回
//        return  Result.ok(pageModel);
//    }
//
//    //4、添加设备
//    @ApiOperation("添加设备出库记录")
//    @PostMapping("save")
//    public Result saveEquipExp(@RequestBody SysEquipmentExport sysEquipmentExport){
//        boolean isSuccess = sysEquipmentExportService.save(sysEquipmentExport);
//
//        if(isSuccess){
//            return Result.ok();
//        }else{
//            return Result.fail();
//        }
//    }
//
//    //5、根据id查询
//    @ApiOperation("根据id查询设备出库记录")
//    @GetMapping("fingEquipExpById/{id}")
//    public Result fingEquipExpById(@PathVariable String id) {
//        SysEquipmentExport sysEquipmentExport = sysEquipmentExportService.getById(id);
//        return Result.ok(sysEquipmentExport);
//    }
//
//    //6、修改-最终修改
//    @ApiOperation("最终修改")
//    @PostMapping("update")
//    public Result updateEquipExp(@RequestBody SysEquipmentExport sysEquipmentExport){
//        boolean isSuccess = sysEquipmentExportService.updateById(sysEquipmentExport);
//        if(isSuccess){
//            return Result.ok();
//        }  else {
//            return Result.fail();
//        }
//    }
//
//    //7、批量删除
//    @ApiOperation("物理批量删除")
//    @DeleteMapping("batchRemove")
//    public Result batchRemove(@RequestBody List<Long> ids){
//        sysEquipmentExportService.removeByIds(ids);
//        return Result.ok();
//    }
//}
//
