package com.equipment.system.mapper;

import com.equipment.model.system.SysUser;
import com.equipment.model.vo.SysEquipQueryVo;
import com.equipment.model.vo.SysUserQueryVo;
import com.equipment.model.system.SysEquipment;
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
 * @since 2024-07-28
 */
public interface SysEquipmentMapper extends BaseMapper<SysEquipment> {

    IPage<SysEquipment> selectPage(Page<SysEquipment> pageParam, @Param("vo") SysEquipQueryVo sysEquipQueryVo);
}
