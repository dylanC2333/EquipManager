package com.equipment.system.controller;

import com.equipment.common.result.Result;
import com.equipment.common.utils.JwtHelper;
import com.equipment.model.system.SysUser;
import com.equipment.model.vo.LoginVo;
import com.equipment.system.exception.EquipException;
import com.equipment.system.service.SysUserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;



@Api(tags= "用户登录接口")
@RestController
@RequestMapping("/admin/system/index")
public class IndexController {

    @Autowired
    private SysUserService sysUserService;

    // login
    @PostMapping("login")
    public Result<Map<String,Object>> login(@RequestBody LoginVo loginVo) {
        // 根据userCode查询数据
        SysUser sysUser = sysUserService.getUserInfoByUserCode(loginVo.getUsername());

        //如果查询为空
        if (sysUser == null){
            throw new EquipException(20001,"用户不存在");
        }

        //判断密码是否一致
        String password = loginVo.getPassword();
        String md5Password =  DigestUtils.md5DigestAsHex(password.getBytes());
        if(!md5Password.equals(sysUser.getPassword())){
            throw new EquipException(20001,"密码不正确");
        }

        // 判断用户是否可用
        if (sysUser.getStatus() == 0){
            throw new EquipException(20001,"用户已被禁用");
        }

        //根据userid和username生成token字符串，通过map返回
        String token = JwtHelper.createToken(sysUser.getId(), sysUser.getUserCode());

        Map<String,Object> map = new HashMap<>();
        map.put("token",token);
        return Result.ok(map);
    }
    // info
    @GetMapping("info")
    public Result<Map<String,Object>> info(HttpServletRequest request) {
        // 获取请求头token字符串
        String token = request.getHeader("token");

        //从token字符串获取用户编号（id）
        String userCode = JwtHelper.getUserCode(token);

        //根据用户名称获取用户信息（基本信息 和 菜单权限 和 按钮权限）
        Map<String,Object> map = sysUserService.getUserInfo(userCode);
        return Result.ok(map);
    }
    /**
     * 退出
     */
    @PostMapping("logout")
    public Result<Void> logout(){
        return Result.ok();
    }
}
