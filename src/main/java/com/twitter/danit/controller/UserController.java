package com.twitter.danit.controller;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.auth.JwtAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.OnClose;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.version}/user")
@Validated
public class UserController {

  private final UserService userService;
  private final JwtAuthService jwtAuthService;

  @GetMapping
  public ResponseEntity<Object> getUser() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    User user = userService.getByUserTag(userTag);

    return ResponseEntity.ok(user);
  }

  public ResponseEntity<Object> create(@Valid @RequestBody User user) {
      userService.create(user);

    return null;
  }


}
