package com.equipment.system.exception;

import com.equipment.common.result.ResultCodeEnum;
import lombok.Data;

@Data
public class EquipException extends RuntimeException {
    private int code;
    private String msg;
    /**
     * 通过状态码和错误消息创建异常对象
     * @param code
     * @param msg
     */
    public EquipException(int code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
    /**
     * 接收枚举类型对象
     * @param resultCodeEnum
     */
    public EquipException(ResultCodeEnum resultCodeEnum) {
        super(resultCodeEnum.getMessage());
        this.code = resultCodeEnum.getCode();
        this.msg = resultCodeEnum.getMessage();
    }

    @Override
    public String toString() {
        return "EquipException [code=" + code + ", msg=" + msg + "]";
    }
}
