package com.twitter.danit.controller;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.security.Principal;

public abstract class AbstractController {
  @Autowired
  private UserService userService;
  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  public User getAuthUser(Principal principal) {
    return this.userService.findByUserTagTrowException(principal.getName());
  }

  public void sendStompMessage(String destination, Object payload) {
    simpMessagingTemplate.convertAndSend(destination, ResponseEntity.ok(payload));
  }
}
