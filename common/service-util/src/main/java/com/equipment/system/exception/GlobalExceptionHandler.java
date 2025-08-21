package com.equipment.system.exception;

import com.equipment.common.result.Result;
import com.equipment.common.result.ResultCodeEnum;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.security.access.AccessDeniedException;
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
        return Result.fail().message("出现其他错误，请联系管理员");
    }

    // 2 数据库触发器等异常
    @ExceptionHandler(value = UncategorizedSQLException.class)
    @ResponseBody
    public Result<Object> error(UncategorizedSQLException e) {
        e.printStackTrace();
        // 默认提示
        String userMessage = "数据输入不合法";
        // 提取根异常中的 message
        Throwable rootCause = e.getRootCause();
        if (rootCause != null) {
            String dbMessage = rootCause.getMessage();
            if (dbMessage != null && !dbMessage.trim().isEmpty()) {
                userMessage = dbMessage;
            }
        }
        return Result.fail().message(userMessage);
    }


    // 3 数据库完整性约束冲突异常
    @ExceptionHandler(value = DuplicateKeyException.class)
    @ResponseBody
    public Result<Object> error(DuplicateKeyException e){
        e.printStackTrace();
        return Result.fail().message("存在重复记录，请检查输入是否有误");
    }


    // 自定义异常例子
    @ExceptionHandler(value = EquipException.class)
    @ResponseBody
    public Result<Object> error(EquipException e){
        e.printStackTrace();
        return Result.fail().message(e.getMessage()).code(e.getCode());
    }

    // 证书解析错误
    @ExceptionHandler(value = JsonParsingRuntimeException.class)
    @ResponseBody
    public Result<Object> error(JsonParsingRuntimeException e){
        e.printStackTrace();
        return Result.fail().message(e.getMessage());
    }

    /**
     * spring security异常
     * @param e
     * @return
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public Result error(AccessDeniedException e) throws AccessDeniedException {
        return Result.fail().code(ResultCodeEnum.PERMISSION.getCode()).message("没有当前功能的权限");
    }


}
