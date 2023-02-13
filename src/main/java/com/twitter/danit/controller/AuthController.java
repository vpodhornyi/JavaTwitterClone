package com.twitter.danit.controller;

import com.twitter.danit.dto.auth.AccountCheckResponse;
import com.twitter.danit.dto.auth.AccountCheckRequest;
import com.twitter.danit.dto.auth.JwtResponse;
import com.twitter.danit.dto.auth.JwtRequest;
import com.twitter.danit.dto.auth.RefreshJwtRequest;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.dto.user.UserResponse;
import com.twitter.danit.facade.user.NewUserResponseMapper;
import com.twitter.danit.facade.user.UserRequestMapper;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.auth.JwtAuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@RestController
@RequestMapping("${api.version}/auth")
@Validated
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
  private final JwtAuthService jwtAuthService;
  private final UserRequestMapper userRequestMapper;
  private final NewUserResponseMapper newUserResponseMapper;
  private final UserService userService;

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
  public ResponseEntity<UserResponse> signup(@RequestBody UserRequest userRequest) {
    User user = userService.createNewUser(userRequestMapper.convertToEntity(userRequest));
    return ResponseEntity.ok(newUserResponseMapper.convertToDto(user));
  }
}

