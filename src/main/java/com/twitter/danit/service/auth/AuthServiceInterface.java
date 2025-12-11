package com.twitter.danit.service.auth;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.*;
import com.twitter.danit.dto.user.UserRequest;
import lombok.NonNull;

public interface AuthServiceInterface {

  public AccountCheckResponse account(@NonNull AccountCheckRequest req);

  public JwtResponse login(@NonNull JwtRequest req);

  public JwtResponse getAccessToken(@NonNull String refreshToken);

  public JwtResponse refresh(@NonNull String refreshToken);

  public JwtAuthentication getAuthInfo();

  void deleteAllByLogin(String login);

  User signup(@NonNull UserRequest userRequest);
}
