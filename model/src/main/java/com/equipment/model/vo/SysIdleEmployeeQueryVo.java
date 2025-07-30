package com.equipment.model.vo;


import lombok.Data;

/*
 * 查询空闲目测人员名单
 * */
@Data
public class SysIdleEmployeeQueryVo {
    private static final long serialVersionUID = 1L;

    /**
     * 查询关键字
     */
    private String keyword;

    /**
     * 查询证书类别id
     */
    private String certificateClassId;

    /**
     * 任务开始时间
     */
    private String startTime;

    /**
     * 任务结束时间
     */
    private String endTime;
}
