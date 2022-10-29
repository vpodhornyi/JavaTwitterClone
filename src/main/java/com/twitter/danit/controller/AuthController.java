package com.twitter.danit.controller;

import com.twitter.danit.domain.auth.*;
import com.twitter.danit.service.auth.JwtAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/auth/")
@Validated
public class AuthController {

  private final JwtAuthService jwtAuthService;

  @GetMapping("ping")
  public String ping() {
    return "pong";
  }

  @PostMapping("account")
  public ResponseEntity<AccountCheckResponse> account(@Valid @RequestBody AccountCheckRequest authRequest) {
    final AccountCheckResponse res = jwtAuthService.account(authRequest);

    return ResponseEntity.ok(res);
  }

  @PostMapping("login")
  public ResponseEntity<JwtResponse> login(@Valid @RequestBody JwtRequest authRequest) {
    final JwtResponse res = jwtAuthService.login(authRequest);

    return ResponseEntity.ok(res);
  }

  @PostMapping("token")
  public ResponseEntity<JwtResponse> getNewAccessToken(@RequestBody RefreshJwtRequest request) {
    return null;
  }

  @PostMapping("refresh")
  public ResponseEntity<JwtResponse> getNewRefreshToken() {
    return null;
  }

}

