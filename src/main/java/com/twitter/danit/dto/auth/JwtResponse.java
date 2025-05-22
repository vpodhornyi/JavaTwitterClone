package com.twitter.danit.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {
  private final String type = "Bearer";
  private String accessToken;
  private String refreshToken;

  @Override
  public String toString() {
    return "JwtResponse{" +
        "type='" + type + '\'' +
        ", accessToken='" + accessToken + '\'' +
        ", refreshToken='" + refreshToken + '\'' +
        '}';
  }
}
