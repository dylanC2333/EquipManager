package com.equipment.model.query;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class TaskDateRangeQuery {

    /**
     * 检测开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date taskStartDate;

    /**
     * 检测结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date taskEndDate;

}


