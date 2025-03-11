package com.equipment.common.utils;

import io.jsonwebtoken.*;
import org.springframework.util.StringUtils;

import java.util.Date;

/**
 * 生成JSON Web令牌的工具类
 */
public class JwtHelper {

    private static long tokenExpiration = 24L * 60 * 60 * 1000 * 30; // 1个月
    private static String tokenSignKey = "654321";

    public static String createToken(String userId, String usercode) {
        String token = Jwts.builder()
                .setSubject("AUTH-USER")
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))
                .claim("userId", userId)
                .claim("userCode", usercode)
                .signWith(SignatureAlgorithm.HS512, tokenSignKey)
                .compressWith(CompressionCodecs.GZIP)
                .compact();
        return token;
    }

    public static Long getUserId(String token) {
        try {
            if (StringUtils.isEmpty(token)) return null;

            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
            Claims claims = claimsJws.getBody();
//            Integer userId = (Integer) claims.get("userId");
//            return userId.longValue();
            Long userId = Long.valueOf(claims.get("userId").toString());
            return userId;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getUserCode(String token) {
        try {
            if (StringUtils.isEmpty(token)) return "";

            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
            Claims claims = claimsJws.getBody();
            return (String) claims.get("userCode");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void removeToken(String token) {
        //jwttoken无需删除，客户端扔掉即可。
    }

    public static void main(String[] args) {
        String token = JwtHelper.createToken("5", "addupdate");//"eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJScgwN8dANDXYNUtJRSq0oULIyNDcyMbWwMLC00FEqLU4t8kwBqjJUgnDyEnNTgdzElNzMPKVaAOlcuitEAAAA.0Jg-r5ESfL_zE2Sgq8ePIrLcpCQoAlfTdRSi_bPqd7i4iFHSfzE_v8vvRpLcgjFjLI5FBZr9O6Q02xjKijwqYQ";//JwtHelper.createToken(7L, "admin");
        System.out.println(token);
        System.out.println(JwtHelper.getUserId(token));
        System.out.println(JwtHelper.getUserCode(token));
    }
}
