package com.equipment.model.vo;

import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class UserIDAndDateRageVo {
    private static final long serialVersionUID = 1L;

    /**
     * 查询关键字
     */
    private String keyword;

    /**
     * 任务开始时间
     */
    private String start;
    private String end;
}
