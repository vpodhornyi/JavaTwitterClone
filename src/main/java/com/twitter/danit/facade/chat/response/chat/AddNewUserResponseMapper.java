package com.twitter.danit.facade.chat.response.chat;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.chat.AddUsersToGroupResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

@Service
public class AddNewUserResponseMapper extends GeneralFacade<Chat, AddUsersToGroupResponse> {
  private final ChatUserMapper chatUserMapper;

  public AddNewUserResponseMapper(ChatUserMapper chatUserMapper) {
    super(Chat.class, AddUsersToGroupResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(AddUsersToGroupResponse dto, Chat entity, User user) {
    dto.setChatId(entity.getId());
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setAddedUsers(entity.getUsers().stream().map(chatUserMapper::convertToDto).toList());
  }
}
