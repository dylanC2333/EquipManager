package com.atguigu.model.vo;


import lombok.Data;

@Data
public class SysEquipmentUseQueryVo {

    private static final long serialVersionUID = 1L;

    /**
     * 查询关键字
     */
    private String keyword;

    /**
     * 任务开始时间
     */
    private String startTime;

    /**
     * 任务结束时间
     */
    private String endTime;
}
