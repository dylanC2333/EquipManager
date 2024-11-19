package com.equipment.model.vo;
import lombok.Data;

/**
 * <p>
 * 通过员工id查找并统计一段时间经历的任务数和打卡天数
 * </p>
 */

@Data
public class StatisticTaskAndDetection {
    private static final long serialVersionUID = 1L;
    private String employeeName;
    private String employeeCode;
    private int taskNum;
    private int detectionNum;
}
