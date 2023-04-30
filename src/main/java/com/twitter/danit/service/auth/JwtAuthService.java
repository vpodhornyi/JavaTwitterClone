package com.twitter.danit.service.auth;

import com.twitter.danit.dao.RefreshJwtStoreDao;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.*;
import com.twitter.danit.exception.WrongPasswordException;
import com.twitter.danit.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtAuthService implements AuthService {
  public final UserService userService;
  private final RefreshJwtStoreDao refreshJwtStoreDao;
  private final JwtProvider jwtProvider;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public AccountCheckResponse account(@NonNull AccountCheckRequest req) {
    userService.findUser(req.getLogin());

    return new AccountCheckResponse(req.getLogin());
  }

  @Override
  public JwtResponse login(@NonNull JwtRequest req) {
    String login = req.getLogin();
    String password = req.getPassword();
    User user = userService.findUser(login);

    if (passwordEncoder.matches(password, user.getPassword())) return getJwtResponse(user);

    throw new WrongPasswordException();
  }

  public JwtResponse getJwtResponse(User user) {
    final String newAccessToken = jwtProvider.generateAccessToken(user);
    final String newRefreshToken = jwtProvider.generateRefreshToken(user);
    RefreshJwtStore refreshJwtStore = new RefreshJwtStore(user.getUserTag(), newRefreshToken);
    refreshJwtStore.setCreatedBy(user.getEmail());
    refreshJwtStore.setUpdatedBy(user.getEmail());
    refreshJwtStoreDao.save(refreshJwtStore);

    return new JwtResponse(newAccessToken, newRefreshToken);
  }

  @Override
  public JwtResponse getAccessToken(@NonNull String refreshToken) {
    if (jwtProvider.validateRefreshToken(refreshToken)) {
      final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
      final String login = claims.getSubject();
      Optional<RefreshJwtStore> refreshJwtStoreOptional = refreshJwtStoreDao.findFirstByLoginOrderByIdDesc(login);

      if (refreshJwtStoreOptional.isPresent()) {
        String saveRefreshToken = refreshJwtStoreOptional.get().getRefreshToken();

        if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
          final User user = userService.findByUserTagTrowException(login);
          final String accessToken = jwtProvider.generateAccessToken(user);

          return new JwtResponse(accessToken, null);
        }
      }
    }
    return new JwtResponse(null, null);
  }

  @Override
  public JwtResponse refresh(@NonNull String refreshToken) {
    if (jwtProvider.validateRefreshToken(refreshToken)) {
      final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
      final String login = claims.getSubject();
      Optional<RefreshJwtStore> refreshJwtStoreOptional = refreshJwtStoreDao.findFirstByLoginOrderByIdDesc(login);

      if (refreshJwtStoreOptional.isPresent()) {
        String saveRefreshToken = refreshJwtStoreOptional.get().getRefreshToken();

        if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
          User user = userService.findByUserTagTrowException(login);
          return getJwtResponse(user);
        }
      }
    }
    throw new RuntimeException();
  }

  @Override
  public JwtAuthentication getAuthInfo() {
    return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
  }

  @Override
  @Transactional
  public void deleteAllByLogin(String login) {
    refreshJwtStoreDao.deleteAllByLogin(login);
  }
}
