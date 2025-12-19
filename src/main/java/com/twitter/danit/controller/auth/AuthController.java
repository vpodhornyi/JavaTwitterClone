package com.twitter.danit.controller.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twitter.danit.dto.auth.AccountCheckResponse;
import com.twitter.danit.dto.auth.AccountCheckRequest;
import com.twitter.danit.dto.auth.JwtResponse;
import com.twitter.danit.dto.auth.JwtRequest;
import com.twitter.danit.dto.auth.RefreshJwtRequest;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.dto.user.NewUserResponse;
import com.twitter.danit.facade.user.NewUserResponseMapper;
import com.twitter.danit.service.auth.JwtAuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("${api.version}/auth")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
  private final JwtAuthService jwtAuthService;
  private final NewUserResponseMapper newUserResponseMapper;

  @PostMapping("/account")
  public ResponseEntity<AccountCheckResponse> account(@Valid @RequestBody AccountCheckRequest authRequest) {
    final AccountCheckResponse res = jwtAuthService.account(authRequest);

    return ResponseEntity.ok(res);
  }

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> getAccessRefreshTokens(@Valid @RequestBody JwtRequest authRequest) {
    final JwtResponse res = jwtAuthService.login(authRequest);

    return ResponseEntity.ok(res);
  }

  @GetMapping("/logout")
  public void logout() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    jwtAuthService.deleteAllByLogin(userTag);
  }

  @PostMapping("/access")
  public ResponseEntity<JwtResponse> getNewAccessToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.getAccessToken(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/refresh")
  public ResponseEntity<JwtResponse> getNewRefreshToken(@RequestBody RefreshJwtRequest request) {
    final JwtResponse jwtResponse = jwtAuthService.refresh(request.getRefreshToken());
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/signup")
  public ResponseEntity<NewUserResponse> signup(@RequestBody UserRequest userRequest) throws JsonProcessingException {
    User user = jwtAuthService.signup(userRequest);
    return ResponseEntity.ok(newUserResponseMapper.convertToDto(user));
  }
}

