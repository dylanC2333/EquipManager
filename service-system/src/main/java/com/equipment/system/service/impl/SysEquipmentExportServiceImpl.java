package com.equipment.system.service.impl;

import com.equipment.model.vo.SysEquipmentExportQueryVo;
import com.equipment.model.system.SysEquipmentExport;
import com.equipment.system.mapper.SysEquipmentExportMapper;
import com.equipment.system.service.SysEquipmentExportService;
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
 * @since 2024-07-31
 */
@Service
public class SysEquipmentExportServiceImpl extends ServiceImpl<SysEquipmentExportMapper, SysEquipmentExport> implements SysEquipmentExportService {

    @Autowired
    private SysEquipmentExportMapper sysEquipmentExportMapper;

    @Override
    public IPage<SysEquipmentExport> selectPage(Page<SysEquipmentExport> pageParam, SysEquipmentExportQueryVo sysEquipmentExportQueryVo) {
        return baseMapper.selectPage(pageParam,sysEquipmentExportQueryVo);
    }
}
