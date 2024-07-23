package com.atguigu.system.mapper;

import com.atguigu.model.system.SysMenu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 菜单表 Mapper 接口
 * </p>
 *
 * @author atguigu
 * @since 2024-07-22
 */
public interface SysMenuMapper extends BaseMapper<SysMenu> {

    //根据用户id查询菜单权限
    List<SysMenu> findMenuListUserId(@Param("userId") String userId);
}
