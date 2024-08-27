package com.atguigu.system.mapper;

import com.atguigu.model.vo.SysEquipmentIntakeQueryVo;
import com.atguigu.model.vo.SysEquipmentTransferQueryVo;
import com.atguigu.system.entity.SysEquipmentIntake;
import com.atguigu.system.entity.SysEquipmentTransfer;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author atguigu
 * @since 2024-08-19
 */
public interface SysEquipmentTransferMapper extends BaseMapper<SysEquipmentTransfer> {

    IPage<SysEquipmentTransfer> selectPage(Page<SysEquipmentTransfer> pageParam, @Param("vo") SysEquipmentTransferQueryVo sysEquipmentTransferQueryVo);
}
