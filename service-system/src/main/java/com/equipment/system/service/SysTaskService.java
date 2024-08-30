package com.equipment.system.service;

import com.equipment.model.vo.SysRoleQueryVo;
import com.equipment.model.vo.SysTaskQueryVo;
import com.equipment.model.system.SysTask;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
public interface SysTaskService extends IService<SysTask> {


    IPage<SysTask> selectPage(Page<SysTask> pageParam, SysTaskQueryVo sysTaskQueryVo);
}
