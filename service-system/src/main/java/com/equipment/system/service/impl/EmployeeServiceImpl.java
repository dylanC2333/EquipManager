package com.equipment.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.equipment.model.system.Employee;
import com.equipment.system.mapper.EmployeeMapper;
import com.equipment.system.service.EmployeeService;
import org.springframework.stereotype.Service;

/**
* @author dylan
* @description 针对表【employee】的数据库操作Service实现
* @createDate 2024-08-12 18:53:13
*/
@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee>
    implements EmployeeService {

}




