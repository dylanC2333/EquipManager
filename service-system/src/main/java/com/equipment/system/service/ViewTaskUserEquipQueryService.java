package com.equipment.system.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.query.TaskDateRangeQuery;
import com.equipment.model.view.ViewTaskUserEquipQuery;
import com.baomidou.mybatisplus.extension.service.IService;
import com.equipment.model.vo.FindEquipByTaskCode;
import com.equipment.model.vo.SysTaskDeviceQueryVo;

/**
* @author ASUS
* @description 针对表【view_task_user_equip_query】的数据库操作Service
* @createDate 2024-10-18 15:51:05
*/
public interface ViewTaskUserEquipQueryService extends IService<ViewTaskUserEquipQuery> {

    IPage<ViewTaskUserEquipQuery> SearchUserByTaskcode(Page<ViewTaskUserEquipQuery> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo);

    IPage<FindEquipByTaskCode> SearchEquipByTaskcode(Page<FindEquipByTaskCode> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo);

    TaskDateRangeQuery SearchDateRangeByTaskcode(SysTaskDeviceQueryVo sysTaskDeviceQueryVo);
}
