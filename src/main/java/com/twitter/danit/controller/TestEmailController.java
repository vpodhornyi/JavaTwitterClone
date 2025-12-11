package com.twitter.danit.controller;

import com.twitter.danit.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.version}")
@RequiredArgsConstructor
public class TestEmailController {

  private final EmailService emailService;

  @GetMapping("/test-email")
  public String test() {
    emailService.sendHtml(
        "wxs@ukr.net",
        "Test Email",
        "<h1>Hello!</h1><p>Your Spring email works 🚀</p>"
    );
    return "OK";
  }
}
