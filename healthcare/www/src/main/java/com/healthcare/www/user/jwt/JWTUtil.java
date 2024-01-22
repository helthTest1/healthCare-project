package com.healthcare.www.user.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    // 0.12.5     JWT를 생성 검증하는 클래스


  private SecretKey secretKey;

  public JWTUtil(@Value("${spring.jwt.secret}")String secret) {

    this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
  }

  // 유저네임 검증
  public String getUsername(String token) {
    //
    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
  }

  // role 검증
  public String getRole(String token) {

    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
  }

  // 토큰만료 검증
  public Boolean isExpired(String token) {

    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
  }

  // 로그인이 완료 되었을 때 토큰을 생성하는 메서드
  public String createJWT(String username, String role, Long expiredMs){
    // id role 토큰유지시간

    return Jwts.builder()
        .claim("username", username)
        .claim("role", role)
        .issuedAt(new Date(System.currentTimeMillis())) // 토큰발행시간 설정
        .expiration(new Date(System.currentTimeMillis() + expiredMs)) // 토큰소멸시간 설정 / 발행시간+토큰유지시간
        .signWith(secretKey) // 암호화 진행
        .compact();
  }

}

