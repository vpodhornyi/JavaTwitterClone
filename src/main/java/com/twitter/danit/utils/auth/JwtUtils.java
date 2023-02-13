package com.twitter.danit.utils.auth;


import com.twitter.danit.dto.auth.JwtAuthentication;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JwtUtils {

  public static JwtAuthentication generate(Claims claims, String login) {
    final JwtAuthentication jwtInfoToken = new JwtAuthentication();
    jwtInfoToken.setUserTag(claims.get(login, String.class));
    return jwtInfoToken;
  }
}
