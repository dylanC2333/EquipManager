package com.equipment.system.exception;

import com.equipment.common.result.ResultCodeEnum;
import lombok.Data;

@Data
public class JsonParsingRuntimeException extends RuntimeException {
    public JsonParsingRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}
