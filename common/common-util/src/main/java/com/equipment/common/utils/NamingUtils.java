package com.equipment.common.utils;


public class NamingUtils {


    // 将驼峰命名转换为下划线命名
    public static String camelToUnderline(String camelCase) {
        if (camelCase == null || camelCase.isEmpty()) {
            return "";
        }
        return camelCase.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }

    // 将下划线命名转换为驼峰命名
    public static String underlineToCamel(String underlineCase) {
        if (underlineCase == null || underlineCase.isEmpty()) {
            return "";
        }
        StringBuilder result = new StringBuilder();
        boolean nextUpperCase = false;
        for (char ch : underlineCase.toCharArray()) {
            if (ch == '_') {
                nextUpperCase = true;
            } else {
                result.append(nextUpperCase ? Character.toUpperCase(ch) : ch);
                nextUpperCase = false;
            }
        }
        return result.toString();
    }

    public static void main(String[] args) {
        String camel = "employeeName";
        String underline = "employee_name";

        System.out.println("驼峰转下划线: " + camelToUnderline(camel)); // 输出：employee_name
        System.out.println("下划线转驼峰: " + underlineToCamel(underline)); // 输出：employeeName
    }
}
