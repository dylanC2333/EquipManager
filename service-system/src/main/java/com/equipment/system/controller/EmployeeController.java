//package com.equipment.system.controller;
//
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.core.metadata.OrderItem;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import com.equipment.common.result.Result;
//import com.equipment.model.vo.EmployeeQueryVo;
//import com.equipment.common.utils.NamingUtils;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@Api(tags = "员工管理接口")
//@RestController
//@RequestMapping("/admin/system/employee")
//public class EmployeeController {
//    @Autowired
//    private EmployeeService employeeService;
//
//    //http://localhost:8800/admin/system/Employe/findAll
//    // 1 查询所有记录
//    @ApiOperation("查询所有接口")
//    @GetMapping("findAll")
//    public Result<List<Employee>> findAll() {
//        List<Employee> list = employeeService.list();
//        return Result.ok(list);
//    }
//
//    // 2 逻辑删除
//    @ApiOperation("逻辑删除接口")
//    @DeleteMapping("remove/{id}")
//    public Result<Void> removeEmployee(@PathVariable String id) {
//        return employeeService.removeById(id) ? Result.ok() : Result.fail();
//    }
//
//    // 3 条件分页查询
//    // 参数：page当前页，limit每页记录
////    @ApiOperation("条件分页查询")
////    @GetMapping("{page}/{limit}")
////    public Result<IPage<Employee>> findPageQueryEmployee(
////
////            @ApiParam(name = "page", value = "当前页码", required = true)
////            @PathVariable int page,
////
////            @ApiParam(name = "limit", value = "每页记录数量", required = true)
////            @PathVariable int limit,
////
////            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
////            EmployeeQueryVo employeeQueryVo
////            ){
////        // 创建page对象
////        Page<Employee> pageParam = new Page<>(page,limit);
////        // 调用service方法
////        QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
////        if (employeeQueryVo.getKeyword() != null) {
////            queryWrapper.like("employee_code", employeeQueryVo.getKeyword());
////        }
////        IPage<Employee> pageModel = employeeService.page(pageParam,queryWrapper);
////        // 返回
////        return  Result.ok(pageModel);
////    }
//
//    // 3 条件排序分页查询
//    @ApiOperation("条件排序分页查询")
//    @GetMapping("{page}/{limit}/{column}/{order}")
//    public Result<IPage<Employee>> findPageQueryEmployee(
//
//            @ApiParam(name = "page", value = "当前页码", required = true)
//            @PathVariable int page,
//
//            @ApiParam(name = "limit", value = "每页记录数量", required = true)
//            @PathVariable int limit,
//
//            @ApiParam(name = "sysRoleQueryVo", value = "查询对象", required = false)
//            EmployeeQueryVo employeeQueryVo,
//
//            @ApiParam(name = "column", value = "字段", required = false)
//            @PathVariable String column,
//
//            @ApiParam(name = "order", value = "排序方式", required = false)
//            @PathVariable String order
//    ) {
//        //创建page对象
//        Page<Employee> pageParam = new Page<>(page, limit);
//        // 调用service方法
//        QueryWrapper<Employee> queryWrapper = new QueryWrapper<>();
//        if (employeeQueryVo.getKeyword() != null) {
//            queryWrapper.like("employee_code", employeeQueryVo.getKeyword())
//                    .or().like("employee_name", employeeQueryVo.getKeyword())
//                    .or().like("telephone", employeeQueryVo.getKeyword());
//        }
//        // 字段格式转换以及判断升序还是降序
//        if (column != null && order != null) {
//            String field = NamingUtils.camelToUnderline(column);
//            //调用page.addOrder()函数加入排序条件
//            if (order.equals("ascending")) {
//                pageParam.addOrder(OrderItem.asc(field));
//            } else {
//                pageParam.addOrder(OrderItem.desc(field));
//            }
//        }
//        IPage<Employee> pageModel = employeeService.page(pageParam, queryWrapper);
//        return Result.ok(pageModel);
//    }
//
//    // 4 添加员工
//    @ApiOperation("添加员工")
//    @PostMapping("save")
//    public Result<Void> saveEmployee(@RequestBody Employee employee) {
//        return employeeService.save(employee) ? Result.ok() : Result.fail();
//    }
//
//    // 5 修改员工
//    @ApiOperation("修改员工")
//    @PutMapping("update")
//    public Result<Void> updateById(@RequestBody Employee employee) {
//        return employeeService.updateById(employee) ? Result.ok() : Result.fail();
//    }
//
//    // 6 根据id查询
//    @ApiOperation("查询员工")
//    @GetMapping("get/{id}")
//    public Result<Employee> get(@PathVariable String id) {
//        Employee employee = employeeService.getById(id);
//        return Result.ok(employee);
//    }
//
//    // 7 根据id批量删除
//    @ApiOperation("根据id列表删除")
//    @DeleteMapping("batchRemove")
//    public Result<Void> batchRemove(@RequestBody List<String> ids) {
//        return employeeService.removeByIds(ids) ? Result.ok() : Result.fail();
//    }
//}
//
//
//    // 排序测试
////    @ApiOperation("通过orderItems")
////    @GetMapping("orderItems")
////    public IPage<Employee> orderItems(Page<Employee> page) {
////        page.addOrder(OrderItem.desc("employee_name"));
////        // 可以指定多列。比如下边这个：按create_time排序，若create_time相同，则按id排序
////        // page.addOrder(OrderItem.desc("create_time"), OrderItem.asc("id"));
////        return employeeService.page(page);
////    }
//
////    @ApiOperation("通过wrapper")
////    @GetMapping("wrapper")
////    public IPage<SysRole> wrapper(Page<SysRole> page) {
////        LambdaQueryWrapper<SysRole> queryWrapper = Wrappers.<User>lambdaQuery();
////        // 按create_time排序，若create_time相同，则按id排序
////        queryWrapper.orderByDesc(User::getCreateTime);
////        queryWrapper.orderByAsc(User::getId);
////        return userService.page(page, queryWrapper);
////    }
