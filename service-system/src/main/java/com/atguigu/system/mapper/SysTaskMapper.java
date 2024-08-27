package com.atguigu.system.mapper;

import com.atguigu.model.vo.SysEquipQueryVo;
import com.atguigu.model.vo.SysTaskQueryVo;
import com.atguigu.system.entity.SysEquipment;
import com.atguigu.system.entity.SysTask;
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
public interface SysTaskMapper extends BaseMapper<SysTask> {

    IPage<SysTask> selectPage(Page<SysTask> pageParam, @Param("vo") SysTaskQueryVo sysTaskQueryVo);

}
