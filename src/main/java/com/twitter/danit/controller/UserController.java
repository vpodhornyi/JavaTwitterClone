package com.twitter.danit.controller;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserResponse;
import com.twitter.danit.facade.user.UserResponseMapper;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.auth.JwtAuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/users")
public class UserController {

  private final JwtAuthService jwtAuthService;
  private final UserService userService;
  private final UserResponseMapper userResponseMapper;

  @GetMapping
  public UserResponse findAuthUser() {
    String userTag = (String) jwtAuthService.getAuthInfo().getPrincipal();
    User user = userService.findByUserTagTrowException(userTag);
    return userResponseMapper.convertToDto(user);
  }

  @GetMapping("/all")
  public List<UserResponse> findAll() {
    return userService.findAll().stream()
            .map(userResponseMapper::convertToDto)
            .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public UserResponse findById(@PathVariable(name = "id") Long id) {
    User user = userService.findById(id);
    return userResponseMapper.convertToDto(user);
  }

  @GetMapping("/search")
  public ResponseEntity<List<UserResponse>> searchUser(@RequestParam String text) {
    List<User> users = userService.findByMatchesInNameOrUserTag(text.trim());

    return ResponseEntity.ok(users.stream().map(userResponseMapper::convertToDto).collect(Collectors.toList()));
  }

  @GetMapping("/")
  public UserResponse findByUserTag(
          @RequestParam(name = "userTag") String userTag
  ) {
    User user = userService.findByUserTagTrowException(userTag);
    return userResponseMapper.convertToDto(user);
  }

  @ExceptionHandler({Exception.class, MethodArgumentNotValidException.class})
  public ResponseEntity<Object> handleException(Exception ex) {
    return new ResponseEntity<>(ex.getCause(), HttpStatus.BAD_REQUEST);
  }
}
