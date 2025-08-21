package com.equipment.system.controller;

import com.equipment.common.result.Result;
import com.equipment.model.system.SysCertificateClass;
import com.equipment.model.system.SysUser;
import com.equipment.model.system.SysUserCertificate;
import com.equipment.model.vo.SysUserCertificateNameVo;
import com.equipment.system.service.SysCertificateClassService;
import com.equipment.system.service.SysUserCertificateService;
import com.equipment.system.service.SysUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "证书类别管理接口")
@RestController
@RequestMapping("/admin/system/sysCertificateClasses")

public class SysCertificateClassController {
    @Autowired
    private SysCertificateClassService sysCertificateClassService;

    @Autowired
    private SysUserCertificateService sysUserCertificateService;

    @Autowired
    private SysUserService sysUserService;
    
    // 1 查询所有记录
    @ApiOperation("查询所有接口")
    @GetMapping("findAll")
    public Result<List<SysCertificateClass>> findAll(){
        List<SysCertificateClass> list = sysCertificateClassService.list();
        return Result.ok(list);
    }

    // 2 逻辑删除
    @ApiOperation("逻辑删除接口")
    @DeleteMapping("remove/{id}")
    public Result<Void> removeCertificateClass(@PathVariable String id){
        return sysCertificateClassService.removeById(id)?Result.ok():Result.fail();
    }
//
//    // 3 条件分页查询
//    // 参数：page当前页，limit每页记录
//    @ApiOperation("条件分页查询")
//    @GetMapping("{page}/{limit}/{column}/{order}")
//    public Result<IPage<SysCertificateClass>> findPageQueryCertificateClass(
//
//            @ApiParam(name = "page", value = "当前页码", required = true)
//            @PathVariable int page,
//
//            @ApiParam(name = "limit", value = "每页记录数量", required = true)
//            @PathVariable int limit,
//
//            @ApiParam(name = "SysCertificateClassQueryVo", value = "查询对象", required = false)
//            SysCertificateClassQueryVo SysCertificateClassQueryVo,
//
//            @ApiParam(name = "column", value = "字段", required = false)
//            @PathVariable String column,
//
//            @ApiParam(name = "order", value = "排序方式{ascending,descending}", required = false)
//            @PathVariable String order
//    ){
//        // 创建page对象
//        Page<SysCertificateClass> pageParam = new Page<>(page,limit);
//        // 构造查询条件
//        QueryWrapper<SysCertificateClass> queryWrapper = new QueryWrapper<>();
//        if(SysCertificateClassQueryVo.getKeyword() !=null){
//            queryWrapper.like("name",SysCertificateClassQueryVo.getKeyword())
//                        .or().like("description",SysCertificateClassQueryVo.getKeyword());
//        }
//        if (column != null && order != null) {
//            String field = NamingUtils.camelToUnderline(column);
//            if (order.equals("ascending")) {
//                queryWrapper.orderByAsc(field);
//            } else {
//                queryWrapper.orderByDesc(field);
//            }
//        }
//        // 调用service方法
//        IPage<SysCertificateClass> pageModel = sysCertificateClassService.page(pageParam, queryWrapper);
//        // 返回
//        return  Result.ok(pageModel);
//    }

    // 4 添加
    @ApiOperation("添加证书类别")
    @PostMapping("save")
    public Result<Void> saveSysCertificateClass(@RequestBody SysCertificateClass sysCertificateClass){
        return sysCertificateClassService.save(sysCertificateClass) ? Result.ok():Result.fail();
    }

    // 5 修改
    @ApiOperation("修改证书类别")
    @PutMapping("update")
    public Result<Void> updateById(@RequestBody SysCertificateClass sysCertificateClass){
        System.out.println(sysCertificateClass);
        return sysCertificateClassService.updateById(sysCertificateClass) ? Result.ok():Result.fail();
    }

    // 6 根据id查询
    @ApiOperation("查询证书类别")
    @GetMapping("get/{id}")
    public Result<SysCertificateClass> getId(@PathVariable String id){
        SysCertificateClass certificateClass = sysCertificateClassService.getById(id);
        return Result.ok(certificateClass);
    }

    // 根据用户查询证书数据
    @ApiOperation("根据用户查询证书数据")
    @GetMapping("user-certificates/findAll/{userid}")
    public Result<List<SysUserCertificateNameVo>> getUserCertificate(@PathVariable String userid){
        List<SysUserCertificateNameVo> userCertificateList = sysUserCertificateService.getByUserId(userid);
        return Result.ok(userCertificateList);
    }

    // 逻辑删除
    @ApiOperation("逻辑删除接口")
    @DeleteMapping("user-certificates/remove/{id}")
    public Result<Void> removeUserCertificate(@PathVariable String id){
        return sysUserCertificateService.removeById(id)?Result.ok():Result.fail();
    }

    // 添加用户证书编号
    @ApiOperation("添加用户证书编号")
    @PostMapping("user-certificates/save")
    public Result<Void> saveUserSysCertificate(@RequestBody SysUserCertificateNameVo sysUserCertificateNameVo){
        SysUserCertificate sysUserCertificate = new SysUserCertificate();
        //字段手动映射
        sysUserCertificate.setUserId(sysUserCertificateNameVo.getUserId());
        sysUserCertificate.setClassId(sysUserCertificateNameVo.getClassId());
        sysUserCertificate.setCertificateNumber(sysUserCertificateNameVo.getCertificateNumber());
        return sysUserCertificateService.save(sysUserCertificate) ? Result.ok():Result.fail();
    }

    // 修改用户证书编号
    @ApiOperation("修改用户证书编号")
    @PutMapping("user-certificates/update")
    public Result<Void> updateUserSysCertificateById(@RequestBody SysUserCertificateNameVo sysUserCertificateNameVo){
        SysUserCertificate sysUserCertificate = new SysUserCertificate();
        // 将 VO 中的字段手动映射到实体类中（因为不能直接用 BeanUtils.copyProperties 处理 ID 或关联字段时丢失精度或意义）
        sysUserCertificate.setId(sysUserCertificateNameVo.getId());
        sysUserCertificate.setUserId(sysUserCertificateNameVo.getUserId());
        sysUserCertificate.setClassId(sysUserCertificateNameVo.getClassId());
        sysUserCertificate.setCertificateNumber(sysUserCertificateNameVo.getCertificateNumber());

        return sysUserCertificateService.updateById(sysUserCertificate) ? Result.ok():Result.fail();
    }

    // 根据id查询用户证书
    @ApiOperation("根据id查询用户证书")
    @GetMapping("user-certificates/get/{id}")
    public Result<SysUserCertificateNameVo> getUserCertificateById(@PathVariable String id){
        SysUserCertificate userCer = sysUserCertificateService.getById(id);
        SysUserCertificateNameVo userCerNameVo = new SysUserCertificateNameVo();
        //拷贝属性，如果字段名一致
        BeanUtils.copyProperties(userCer, userCerNameVo);
        //设置额外字段
        userCerNameVo.setUserName(sysUserService.getById(userCer.getUserId()).getUserName());
        //需要类型转换，id为String，但是classId为long。
        userCerNameVo.setCertificateName(sysCertificateClassService.getById(userCer.getClassId()).getName());
        return Result.ok(userCerNameVo);
    }

}
