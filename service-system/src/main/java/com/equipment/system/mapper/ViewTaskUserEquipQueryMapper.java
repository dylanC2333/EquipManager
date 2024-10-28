package com.equipment.system.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.SysEquipmentUse;
import com.equipment.model.view.ViewTaskUserEquipQuery;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.equipment.model.vo.FindEquipByTaskCode;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import org.apache.ibatis.annotations.Param;

/**
* @author ASUS
* @description 针对表【view_task_user_equip_query】的数据库操作Mapper
* @createDate 2024-10-18 15:51:05
* @Entity com.equip.system.domain.ViewTaskUserEquipQuery
*/
public interface ViewTaskUserEquipQueryMapper extends BaseMapper<ViewTaskUserEquipQuery> {

    IPage<ViewTaskUserEquipQuery> SearchUserDeviceByTaskcode(Page<ViewTaskUserEquipQuery> pageParam, @Param("sysTaskDeviceQuery") SysTaskDeviceQueryVo sysTaskDeviceQueryVo);

    IPage<FindEquipByTaskCode> SearchEquipByTask(Page<FindEquipByTaskCode> pageParam, @Param("sysTaskDeviceQuery")SysTaskDeviceQueryVo sysTaskDeviceQueryVo);
}




