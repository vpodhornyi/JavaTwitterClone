package com.twitter.danit.facade.chat.request;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.dto.chat.request.PrivateChatRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.UserService;
import org.springframework.stereotype.Service;
import com.twitter.danit.domain.user.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrivateChatRequestMapper extends GeneralFacade<Chat, PrivateChatRequest> {

  private final UserService userService;

  public PrivateChatRequestMapper(UserService userService) {
    super(Chat.class, PrivateChatRequest.class);
    this.userService = userService;
  }

  @Override
  protected void decorateEntity(Chat entity, PrivateChatRequest dto, User authUser) {
    Long guestUserId = dto.getGuestUserId();
    User guestUser = userService.findById(guestUserId);
    List<User> users = new ArrayList<>();
    users.add(authUser);
    users.add(guestUser);
    String email = authUser.getEmail();
    entity.setUsers(users);
    entity.setCreatedBy(email);
    entity.setUpdatedBy(email);
  }
}
