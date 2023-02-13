package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponse> {
  private final MessageService messageService;

  public UserResponseMapper(MessageService messageService) {
    super(User.class, UserResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(UserResponse dto, User entity) {
    dto.setCountUnreadMessages(messageService.getCountAllUnreadChatMessagesByUserId(entity.getId()));
  }
}
