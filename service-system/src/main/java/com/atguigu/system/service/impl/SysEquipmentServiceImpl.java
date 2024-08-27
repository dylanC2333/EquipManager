package com.atguigu.system.service.impl;

import com.atguigu.model.system.SysRole;
import com.atguigu.model.vo.SysEquipQueryVo;
import com.atguigu.model.vo.SysRoleQueryVo;
import com.atguigu.system.entity.SysEquipment;
import com.atguigu.system.mapper.SysEquipmentMapper;
import com.atguigu.system.service.SysEquipmentService;
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
public class SysEquipmentServiceImpl extends ServiceImpl<SysEquipmentMapper, SysEquipment> implements SysEquipmentService {

    @Autowired
    private SysEquipmentMapper sysEquipmentMapper;


    @Override
    public IPage<SysEquipment> selectPage(Page<SysEquipment> pageParam, SysEquipQueryVo sysEquipQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipQueryVo);
    }
}
