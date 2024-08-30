package com.equipment.system.mapper;

import com.equipment.model.vo.SysEquipmentIntakeQueryVo;
import com.equipment.model.vo.SysEquipmentTransferQueryVo;
import com.equipment.model.system.SysEquipmentTransfer;
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
