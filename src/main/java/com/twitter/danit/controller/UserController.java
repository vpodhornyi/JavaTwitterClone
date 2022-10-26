package com.twitter.danit.controller;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.version}/auth")
public class UserController {

  @GetMapping("/ping")
  public String ping() {
    return "pong";
  }
}
