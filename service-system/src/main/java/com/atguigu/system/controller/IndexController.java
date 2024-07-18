package com.atguigu.system.controller;


import com.atguigu.common.result.Result;
import com.atguigu.system.service.SysRoleService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "用户登录接口")
@RestController
@RequestMapping("/admin/system/index")
public class IndexController {


   @PostMapping("login")
   public Result login() {
       Map<String,Object> map = new HashMap<>();
       map.put("token","admin-token");
       return Result.ok(map);
   }


   @GetMapping("info")
    public Result info() {
       Map<String, Object> map = new HashMap<>();
       map.put("roles","[admin]");
       map.put("introduce","I am a super administrator");
       map.put("avatar","https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
       map.put("name","Super Admin atguigu");
       return Result.ok(map);
   }
   @PostMapping("/logout")
    public Result logout() {
       return Result.ok();
   }

}
