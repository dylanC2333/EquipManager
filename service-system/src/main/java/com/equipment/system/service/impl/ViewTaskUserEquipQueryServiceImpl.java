package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.equipment.model.query.TaskDateRangeQuery;
import com.equipment.model.view.ViewTaskUserEquipQuery;
import com.equipment.model.view.ViewUserCertificate;
import com.equipment.model.vo.FindEquipByTaskCode;
import com.equipment.model.vo.SysTaskDeviceQueryVo;
import com.equipment.system.exception.JsonParsingRuntimeException;
import com.equipment.system.mapper.ViewTaskUserEquipQueryMapper;
import com.equipment.system.service.ViewTaskUserEquipQueryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
* @author ASUS
* @description 针对表【view_task_user_equip_query】的数据库操作Service实现
* @createDate 2024-10-18 15:51:05
*/
@Service
public class ViewTaskUserEquipQueryServiceImpl extends ServiceImpl<ViewTaskUserEquipQueryMapper, ViewTaskUserEquipQuery>
    implements ViewTaskUserEquipQueryService {

    // Spring Boot 会自动配置一个 ObjectMapper Bean，我们直接注入使用
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public IPage<ViewTaskUserEquipQuery> SearchUserByTaskcode(Page<ViewTaskUserEquipQuery> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        // 执行分页查询，获取包含分页结果的 IPage 对象
        IPage<ViewTaskUserEquipQuery> pagedResult = baseMapper.SearchUserByTaskCode(pageParam, sysTaskDeviceQueryVo);

        // 从分页结果中，获取当前页的记录列表
        List<ViewTaskUserEquipQuery> userRecords = pagedResult.getRecords();

        // 遍历这个列表（而不是整个数据库的结果），对每一条记录进行证书JSON的解析
        for (ViewTaskUserEquipQuery user : userRecords) {
            String json = user.getCertificatesJson();
            if (json != null && !json.isEmpty()) {
                try {
                    // 使用 Jackson 解析 JSON 字符串
                    List<ViewUserCertificate> certificates = objectMapper.readValue(json, new TypeReference<List<ViewUserCertificate>>() {});
                    // 将解析后的 List 对象设置回 user 对象中
                    user.setAllCertificates(certificates);
                } catch (JsonProcessingException e) {// 将检查型异常(Checked Exception)包装成非检查型异常(Runtime Exception)并抛出
                    // 这会中断当前方法的执行，并将错误传递到上层调用者（最终到Controller）
                    throw new JsonParsingRuntimeException("解析用户证书JSON失败, userCode: " + user.getEmployeeCode(), e);
                }
            } else {
                user.setAllCertificates(Collections.emptyList());
            }
        }
        // 原始的 pagedResult 对象。
        return pagedResult;
    }

    @Override
    public IPage<FindEquipByTaskCode> SearchEquipByTaskcode(Page<FindEquipByTaskCode> pageParam, SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        return baseMapper.SearchEquipByTask(pageParam, sysTaskDeviceQueryVo);
    }

    @Override
    public TaskDateRangeQuery SearchDateRangeByTaskcode(SysTaskDeviceQueryVo sysTaskDeviceQueryVo) {
        return baseMapper.SearchDateRangeByTaskCode(sysTaskDeviceQueryVo);
    }
}




