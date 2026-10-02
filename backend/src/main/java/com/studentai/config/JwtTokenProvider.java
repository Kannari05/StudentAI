package com.studentai.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, String role) {

        Date now = new Date();
        Date expiryDate =
                new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String getUsernameFromToken(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {

        try {

            Jws<Claims> claimsJws =
                    Jwts.parserBuilder()
                            .setSigningKey(getSigningKey())
                            .build()
                            .parseClaimsJws(token);

            System.out.println("JWT VALIDATION SUCCESS");
            System.out.println(
                    "JWT SUBJECT: "
                            + claimsJws.getBody().getSubject()
            );
            System.out.println(
                    "JWT EXPIRATION: "
                            + claimsJws.getBody().getExpiration()
            );

            return true;

        } catch (io.jsonwebtoken.ExpiredJwtException e) {

            System.out.println("JWT ERROR: TOKEN EXPIRED");
            System.out.println(e.getMessage());

        } catch (io.jsonwebtoken.security.SignatureException e) {

            System.out.println("JWT ERROR: INVALID SIGNATURE");
            System.out.println(e.getMessage());

        } catch (JwtException e) {

            System.out.println("JWT ERROR: INVALID TOKEN");
            System.out.println(e.getMessage());

        } catch (IllegalArgumentException e) {

            System.out.println("JWT ERROR: EMPTY OR INVALID TOKEN");
            System.out.println(e.getMessage());
        }

        return false;
    }
}