package com.twitter.danit.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

  @Value("${api.version}")
  private String serverVersion;

  @GetMapping("/ping")
  public ResponseEntity<Map<String, String>> ping() {
    Map<String, String> val = new HashMap<>();
    val.put("apiVersion", serverVersion);
    return ResponseEntity.ok(val);
  }
}
