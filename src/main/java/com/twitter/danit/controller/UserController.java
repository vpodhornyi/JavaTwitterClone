package com.twitter.danit.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.AccountCheckRequest;
import com.twitter.danit.dto.user.*;
import com.twitter.danit.facade.user.CustomStyleResponseMapper;
import com.twitter.danit.facade.user.FollowUserResponseMapper;
import com.twitter.danit.facade.user.UserResponseMapper;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.auth.JwtAuthService;
import com.twitter.danit.service.email.EmailService;
import com.twitter.danit.utils.Password;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
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
  private final CustomStyleResponseMapper customStyleResponseMapper;
  private final EmailService emailService;
  private final BCryptPasswordEncoder passwordEncoder;
  private final FollowUserResponseMapper followUserResponseMapper;

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

  @PutMapping("/profile")
  public ResponseEntity<UserResponse> editUserProfile(@RequestBody UserRequest userRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    User updatedUser = userService.updateUser(authUser, userRequest);
    return ResponseEntity.ok(userResponseMapper.convertToDto(updatedUser));
  }

  @GetMapping("/search")
  public ResponseEntity<List<UserResponse>> searchUser(@RequestParam String text) {
    List<User> users = userService.findByMatchesInNameOrUserTag(text.trim());
    return ResponseEntity.ok(users.stream().map(userResponseMapper::convertToDto).collect(Collectors.toList()));
  }

  @GetMapping("/")
  public ResponseEntity<UserResponse> findByUserTag(@RequestParam(name = "userTag") String userTag) {
    User user = userService.findByUserTagTrowException(userTag);
    return ResponseEntity.ok(userResponseMapper.convertToDto(user));
  }

  @PutMapping("/customize")
  public ResponseEntity<CustomStyleResponse> updateCustomize(@RequestBody CustomStyleRequest customStyleRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    CustomStyle savwdCustomStyle = userService.updateCustomStyle(authUser, customStyleRequest);
    return ResponseEntity.ok(customStyleResponseMapper.convertToDto(savwdCustomStyle));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<ResetPasswordResponse> signup(@Valid @RequestBody AccountCheckRequest authRequest) throws JsonProcessingException {
    String password = Password.getRandomPassword();
    User user = userService.findUser(authRequest.getLogin());
    user.setPassword(passwordEncoder.encode(password));
    userService.save(user);
    emailService.sendByNodeMailer(user, password);
    return ResponseEntity.ok(new ResetPasswordResponse());
  }

  @PostMapping("/follow")
  public ResponseEntity<FollowUserResponse> follow(@RequestBody FollowUserRequest followUserRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    User followUser = userService.findByIdTrowException(followUserRequest.getFollowUserId());
    boolean isFollow = userService.addFollower(authUser, followUser);

    return ResponseEntity.ok(followUserResponseMapper.getFollowUserResponse(followUser, isFollow));
  }
}
