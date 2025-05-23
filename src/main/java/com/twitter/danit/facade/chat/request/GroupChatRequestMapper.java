package com.twitter.danit.facade.chat.request;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.request.GroupChatRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupChatRequestMapper extends GeneralFacade<Chat, GroupChatRequest> {

  private final UserService userService;

  public GroupChatRequestMapper(UserService userService) {
    super(Chat.class, GroupChatRequest.class);
    this.userService = userService;
  }

  @Override
  protected void decorateEntity(Chat entity, GroupChatRequest dto, User user) {
    String email = user.getEmail();
    List<Long> usersIds = dto.getUsersIds();
    usersIds.add(0, user.getId());
    List<User> users = usersIds.stream()
      .map(userService::findById)
      .toList();
    entity.setUsers(users);
    entity.setCreatedBy(email);
    entity.setUpdatedBy(email);
  }
}
