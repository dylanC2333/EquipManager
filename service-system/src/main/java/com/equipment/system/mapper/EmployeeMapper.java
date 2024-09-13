package com.equipment.system.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
* @author dylan
* @description 针对表【employee】的数据库操作Mapper
* @createDate 2024-08-12 18:53:13
* @Entity generator.domain.Employee
*/
@Repository
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> {

    //条件分页查询
//    IPage<Employee> selectPage(Page<Employee> pageParam, @Param("vo") EmployeeQueryVo employeeQueryVo);
}




