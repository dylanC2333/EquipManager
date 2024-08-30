package com.equipment.system.service.impl;

import com.equipment.model.system.SysRole;
import com.equipment.model.vo.SysEquipQueryVo;
import com.equipment.model.vo.SysRoleQueryVo;
import com.equipment.model.system.SysEquipment;
import com.equipment.system.mapper.SysEquipmentMapper;
import com.equipment.system.service.SysEquipmentService;
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
