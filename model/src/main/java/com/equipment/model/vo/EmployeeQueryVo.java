package com.equipment.model.vo;

import java.io.Serializable;

public class EmployeeQueryVo implements Serializable {
    private static final long serialVersionUID = 1L;

    private String keyword;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}


