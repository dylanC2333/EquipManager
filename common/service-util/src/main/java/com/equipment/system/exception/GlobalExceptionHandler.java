package com.equipment.system.exception;

import com.equipment.common.result.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    // 1 全局异常
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result<Object> error(Exception e){
        e.printStackTrace();
        return Result.fail().message("执行了全局异常处理");
    }

    // 2 特定异常
    @ExceptionHandler(value = ArithmeticException.class)
    @ResponseBody
    public Result<Object> error(ArithmeticException e){
        e.printStackTrace();
        return Result.fail().message("执行了特定异常处理");
    }
    // 3 自定义异常
    @ExceptionHandler(value = EquipException.class)
    @ResponseBody
    public Result<Object> error(EquipException e){
        e.printStackTrace();
        return Result.fail().message(e.getMessage()).code(e.getCode());
    }
}
