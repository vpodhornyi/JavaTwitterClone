package com.twitter.danit.controller;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserResponse;
import com.twitter.danit.facade.user.UserResponseMapper;
import com.twitter.danit.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.version}/explore")
@AllArgsConstructor
@Slf4j
public class ExploreController extends AbstractController {

  private final UserService userService;
  private final UserResponseMapper userResponseMapper;

  @GetMapping
  public ResponseEntity<List<UserResponse>> explore(@RequestParam String text) {
    List<User> users = userService.findByMatchesInNameOrUserTag(text.trim());
    return ResponseEntity.ok(users.stream().map(userResponseMapper::convertToDto).collect(Collectors.toList()));
  }
}
