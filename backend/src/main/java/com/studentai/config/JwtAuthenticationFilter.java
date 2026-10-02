package com.studentai.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = getJwtFromRequest(request);

        System.out.println("=================================");
        System.out.println("JWT FILTER");
        System.out.println("Request: " +
                request.getMethod() + " " + request.getRequestURI());
        System.out.println("JWT PRESENT: " + (jwt != null));

        try {

            if (!StringUtils.hasText(jwt)) {
                System.out.println("JWT STATUS: NOT PRESENT");
            } else {

                System.out.println("JWT STATUS: TOKEN FOUND");

                boolean valid = tokenProvider.validateToken(jwt);

                System.out.println("JWT VALID: " + valid);

                if (valid) {

                    String username =
                            tokenProvider.getUsernameFromToken(jwt);

                    System.out.println("JWT USERNAME: " + username);

                    UserDetails userDetails =
                            userDetailsService.loadUserByUsername(username);

                    System.out.println(
                            "USER FOUND: " + userDetails.getUsername()
                    );

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println("AUTHENTICATION: SUCCESS");

                } else {
                    System.out.println("AUTHENTICATION: FAILED - INVALID JWT");
                }
            }

        } catch (Exception ex) {

            System.out.println("=================================");
            System.out.println("JWT AUTHENTICATION ERROR");
            System.out.println("ERROR TYPE: " + ex.getClass().getName());
            System.out.println("ERROR MESSAGE: " + ex.getMessage());
            ex.printStackTrace();
            System.out.println("=================================");
        }

        System.out.println("SECURITY CONTEXT AUTHENTICATED: " +
                (SecurityContextHolder.getContext()
                        .getAuthentication() != null));

        System.out.println("=================================");

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {

        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken)
                && bearerToken.startsWith("Bearer ")) {

            return bearerToken.substring(7);
        }

        return null;
    }
}