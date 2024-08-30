package com.equipment.system.test;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.equipment.model.system.Employee;
import com.equipment.system.mapper.EmployeeMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class EmployeeMapperTest {

    @Autowired
    private EmployeeMapper employeeMapper;

    // 1 查询全部
    @Test
    public void findAll(){
        List<Employee> list = employeeMapper.selectList(null);
        for (Employee employee : list) {
            System.out.println(employee);
        }
    }
    // 其他略
    // 2 条件分页查询
    @Test
    public void selectPage(){
        Page<Employee> page = employeeMapper.selectPage(new Page<Employee>(2, 1), null);
        for (Employee employee : page.getRecords()) {
            System.out.println(employee);
        }
    }
}
