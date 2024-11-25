package com.equipment.model.vo;

import lombok.Data;

/**
 * <p>
 * 通过任务编号查找设备的名称和设备id
 * </p>
 */
@Data
public class FindEquipByTaskCode {
    private static final long serialVersionUID = 1L;
    // 规格型号
    private String specification;
    /**
     * 设备编码
     */
    private String equipmentCode;

    /**
     * 设备名称
     */
    private String equipmentName;
    private String taskCode;
    /**
     * 是否补充记录（0:否，真实 1:是，后续补充）
     */
    private Integer isAdditional;

}


