package com.twitter.danit.controller.auth;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.NewUserResponse;
import com.twitter.danit.facade.user.NewUserResponseMapper;
import com.twitter.danit.service.auth.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/auth/google")
@Validated
@CrossOrigin
public class GoogleAuthController {
  private final GoogleAuthService googleAuthService;
  private final NewUserResponseMapper newUserResponseMapper;

  @GetMapping
  public ResponseEntity<Void> redirectToGoogle() {
    String url = googleAuthService.buildGoogleAuthorizationUrl();
    return ResponseEntity.status(HttpStatus.FOUND)
        .location(URI.create(url))
        .build();
  }

  @GetMapping("/callback")
  public void handleCallback(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
    User user = googleAuthService.handleCallback(code);

    NewUserResponse dto = newUserResponseMapper.convertToDto(user);

    String access = dto.getJwt().getAccessToken();
    String refresh = dto.getJwt().getRefreshToken();
    String redirectUrl = "http://localhost:3000/auth/callback"
        + "?access=" + URLEncoder.encode(access, StandardCharsets.UTF_8)
        + "&refresh=" + URLEncoder.encode(refresh, StandardCharsets.UTF_8)
        + "&type=" + URLEncoder.encode("Bearer", StandardCharsets.UTF_8);

    response.sendRedirect(redirectUrl);
  }
}
