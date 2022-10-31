package com.twitter.danit.service.auth;

import com.twitter.danit.domain.auth.*;
import lombok.NonNull;

public interface AuthService {
  public AccountCheckResponse account(@NonNull AccountCheckRequest req);

  public JwtResponse login(@NonNull JwtRequest req);

  public JwtResponse getAccessToken(@NonNull String refreshToken);

  public JwtResponse refresh(@NonNull String refreshToken);

  public JwtAuthentication getAuthInfo();

  void deleteAllByLogin(String login);
}
