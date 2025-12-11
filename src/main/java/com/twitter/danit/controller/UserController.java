package com.twitter.danit.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.AccountCheckRequest;
import com.twitter.danit.dto.user.*;
import com.twitter.danit.facade.user.CustomStyleResponseMapper;
import com.twitter.danit.facade.user.FollowUserResponseMapper;
import com.twitter.danit.facade.user.FollowUserWebsocketResponseMapper;
import com.twitter.danit.facade.user.UserResponseMapper;
import com.twitter.danit.service.UserService;
import com.twitter.danit.service.auth.JwtAuthService;
import com.twitter.danit.service.email.EmailService;
import com.twitter.danit.utils.Password;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/users")
public class UserController extends AbstractController {

  private final JwtAuthService jwtAuthService;
  private final UserService userService;
  private final UserResponseMapper userResponseMapper;
  private final CustomStyleResponseMapper customStyleResponseMapper;
  private final EmailService emailService;
  private final FollowUserResponseMapper followUserResponseMapper;
  private final FollowUserWebsocketResponseMapper followUserWebsocketResponseMapper;

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

//  @GetMapping("/{id}")
//  public UserResponse findById(@PathVariable(name = "id") Long id) {
//    User user = userService.findById(id);
//    return userResponseMapper.convertToDto(user);
//  }

  @PutMapping("/profile")
  public ResponseEntity<UserResponse> editUserProfile(@RequestBody UserRequest userRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    User updatedUser = userService.updateUser(authUser, userRequest);
    return ResponseEntity.ok(userResponseMapper.convertToDto(updatedUser));
  }

  @GetMapping("/search")
  public ResponseEntity<List<UserResponse>> searchUser(@RequestParam String text, Principal principal) {
    User authUser = getAuthUser(principal);
    List<User> users = userService.findByMatchesInNameOrUserTag(text.trim());
    return ResponseEntity.ok(users.stream().map(user -> userResponseMapper.convertToDto(user, authUser)).collect(Collectors.toList()));
  }

  @GetMapping("/{userTag}")
  public ResponseEntity<UserResponse> findByUserTag(@PathVariable(name = "userTag") String userTag, Principal principal) {
    User authUser = getAuthUser(principal);
    User user = userService.findByUserTagTrowException(userTag);
    return ResponseEntity.ok(userResponseMapper.convertToDto(user, authUser));
  }

  @PutMapping("/customize")
  public ResponseEntity<CustomStyleResponse> updateCustomize(@RequestBody CustomStyleRequest customStyleRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    CustomStyle savedCustomStyle = userService.updateCustomStyle(authUser, customStyleRequest);
    return ResponseEntity.ok(customStyleResponseMapper.convertToDto(savedCustomStyle));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<ResetPasswordResponse> resetPassword(@Valid @RequestBody AccountCheckRequest authRequest) throws JsonProcessingException {
    userService.sendNewPassword(authRequest.getLogin());
    return ResponseEntity.ok(new ResetPasswordResponse());
  }

  @PostMapping("/follow")
  public ResponseEntity<FollowUserResponse> follow(@RequestBody FollowUserRequest followUserRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    User followUser = userService.findByIdTrowException(followUserRequest.getFollowUserId());
    boolean isFollow = userService.addFollower(authUser, followUser);
    String queue = userQueue + followUser.getId();
    sendStompMessage(queue, followUserWebsocketResponseMapper.convertToDto(followUser, authUser));

    Notification notification = isFollow ? notificationService.followUser(authUser, followUser) :
        notificationService.unfollowUser(authUser, followUser);
    sendStompMessage(queue, notificationResponseMapping.convertToDto(notification));

    return ResponseEntity.ok(followUserResponseMapper.convertToDto(followUser, isFollow, authUser));
  }
}
