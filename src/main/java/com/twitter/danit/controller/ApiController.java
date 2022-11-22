package com.twitter.danit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-version")
@RequiredArgsConstructor
public class ApiController {
  @GetMapping
  public ResponseEntity<String> getApiVersion() {
    return ResponseEntity.ok("/api/v0");
  }
}
