package com.equipment.system.filter;

import com.alibaba.fastjson.JSON;
import com.equipment.common.result.Result;
import com.equipment.common.result.ResultCodeEnum;
import com.equipment.common.utils.JwtHelper;
import com.equipment.common.utils.ResponseUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TokenAuthenticationFilter extends OncePerRequestFilter {


        private RedisTemplate redisTemplate;

        public TokenAuthenticationFilter(RedisTemplate redisTemplate) {
            this.redisTemplate = redisTemplate;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws IOException, ServletException {
            logger.info("uri:"+request.getRequestURI());
            //如果是登录接口，直接放行
            if("/admin/system/index/login".equals(request.getRequestURI())) {
                chain.doFilter(request, response);
                return;
            }

            UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
            if(null != authentication) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(request, response);
            } else {
                ResponseUtil.out(response, Result.build(null, ResultCodeEnum.PERMISSION));
            }
        }

        private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
            // token置于header里
            String token = request.getHeader("token");
            logger.info("token:"+token);
            if (!StringUtils.isEmpty(token)) {
                String userCode = JwtHelper.getUserCode(token);
                logger.info("userCode:"+userCode);
                if (!StringUtils.isEmpty(userCode)) {
                    String authoritiesString = (String) redisTemplate.opsForValue().get(userCode);
                    List<Map> mapList = JSON.parseArray(authoritiesString, Map.class);
                    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    for (Map map : mapList) {
                        authorities.add(new SimpleGrantedAuthority((String)map.get("authority")));
                    }
                    return new UsernamePasswordAuthenticationToken(userCode, null, authorities);
                    // return new UsernamePasswordAuthenticationToken(useruame, null, Collections.emptyList());
                }
            }
            return null;
        }
}
