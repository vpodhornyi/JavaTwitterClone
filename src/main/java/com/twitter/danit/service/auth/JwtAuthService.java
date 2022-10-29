package com.twitter.danit.service.auth;

import com.twitter.danit.dao.RefreshJwtStoreDao;
import com.twitter.danit.domain.auth.*;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.exception.WrongPasswordException;
import com.twitter.danit.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtAuthService implements AuthService {

  public final UserService userService;
  public final RefreshJwtStoreDao refreshJwtStoreDao;
  public final JwtProvider jwtProvider;

  @Override
  public AccountCheckResponse account(@NonNull AccountCheckRequest req) {
    try {
      userService.getByUserTag(req.getLogin());
    } catch (Exception e) {
      userService.getByEmail(req.getLogin());
    }
    return new AccountCheckResponse(req.getLogin());
  }

  @Override
  public JwtResponse login(@NonNull JwtRequest req) {
    User user;

    try {
      user = userService.getByUserTag(req.getLogin());
    } catch (Exception e) {
      user = userService.getByEmail(req.getLogin());
    }

    if (user.getPassword().equals(req.getPassword())) {
      final RefreshJwtStore refreshJwtStore = new RefreshJwtStore(jwtProvider.generateRefreshToken(user));
      refreshJwtStoreDao.save(refreshJwtStore);

      return new JwtResponse(jwtProvider.generateAccessToken(user), refreshJwtStore.getRefreshToken());
    }

    throw new WrongPasswordException();
  }

  @Override
  public JwtResponse getAccessToken(@NonNull String refreshToken) {
    return null;
  }

  @Override
  public JwtResponse refresh(@NonNull String refreshToken) {
    return null;
  }

  @Override
  public JwtResponse getAuthInfo() {
    return null;
  }
}
