package com.atguigu.system.service.impl;

import com.atguigu.model.vo.SysRoleQueryVo;
import com.atguigu.model.vo.SysTaskQueryVo;
import com.atguigu.system.entity.SysEquipment;
import com.atguigu.system.entity.SysTask;
import com.atguigu.system.mapper.SysEquipmentMapper;
import com.atguigu.system.mapper.SysTaskMapper;
import com.atguigu.system.service.SysTaskService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author atguigu
 * @since 2024-07-28
 */
@Service
public class SysTaskServiceImpl extends ServiceImpl<SysTaskMapper, SysTask> implements SysTaskService {

    @Autowired
    private SysTaskMapper sysTaskMapper;


    @Override
    public IPage<SysTask> selectPage(Page<SysTask> pageParam, SysTaskQueryVo sysTaskQueryVo) {
        return baseMapper.selectPage(pageParam,sysTaskQueryVo);
    }
}
