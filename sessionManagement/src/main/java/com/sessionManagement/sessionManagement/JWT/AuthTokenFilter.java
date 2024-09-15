package com.sessionManagement.sessionManagement.JWT;

import com.sessionManagement.sessionManagement.services.UserDetails.UserDetailsService;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class AuthTokenFilter extends OncePerRequestFilter
{
    @Autowired
    private JWTUtils JWTUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal
            (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, UsernameNotFoundException
    {
        try
        {
            System.out.println("Request: "+ request.toString());
            System.out.println(request.getHeaderNames());
            System.out.println(request.getRequestURI());
            System.out.println(request.getRequestURL());
            String jwt = parseJwt(request);
            System.out.println("jwt from tokenFilter: "+jwt);
            if (jwt != null && JWTUtils.validateJwtToken(jwt)) {
                String username = JWTUtils.getUserNameFromJwtToken(jwt);
                System.out.println("username: "+username);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                System.out.println("1");
                SecurityContextHolder.getContext().setAuthentication(authentication);
//                System.out.println("2");
            }
        }
        catch(Exception e)
        {
            logger.error("Cannot set user authentication: {}", e);
        }


        filterChain.doFilter(request, response);
    }


    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
//        System.out.println("print from parseJWT: "+ request);
//        System.out.println("print headerAuth from parseJWT: "+headerAuth);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }
//    private String parseJwt(HttpServletRequest request)
//    {
//        return JWTUtils.getJwtFromCookies(request);
//    }
}
