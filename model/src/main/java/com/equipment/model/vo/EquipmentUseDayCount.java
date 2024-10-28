package com.equipment.model.vo;
import lombok.Data;

/**
 * <p>
 * 通过设备编号查询统计设备在一段时间使用的天数，包括真假的记录
 * </p>
 */

@Data
public class EquipmentUseDayCount {
    private static final long serialVersionUID = 1L;
    /**
     * 设备编码
     */
    private String equipmentCode;

    /**
     * 设备名称
     */
    private String equipmentName;

    // 使用天数统计
    private int useDayCount;


}
