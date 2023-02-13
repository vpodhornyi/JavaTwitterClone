package com.twitter.danit.facade.chat.response.chat;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.chat.PrivateChatResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import com.twitter.danit.facade.chat.response.message.LastChatMessageMapper;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateChatResponseMapper extends GeneralFacade<Chat, PrivateChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final MessageService messageService;
  private final LastChatMessageMapper lastChatMessageMapper;

  public PrivateChatResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService, LastChatMessageMapper lastChatMessageMapper) {
    super(Chat.class, PrivateChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
    this.lastChatMessageMapper = lastChatMessageMapper;
  }

  @Override
  protected void decorateDto(PrivateChatResponse dto, Chat entity, User user) {
    List<User> users = entity.getUsers();
    User guestUser;

    if (user.equals(users.get(0))) {
      guestUser = users.get(1);
      dto.setAuthUser(chatUserMapper.convertToDto(users.get(0)));
    } else {
      guestUser = users.get(0);
      dto.setAuthUser(chatUserMapper.convertToDto(users.get(1)));
    }
    dto.setGuestUser(chatUserMapper.convertToDto(guestUser));
    dto.setTitle(guestUser.getName());
    dto.setUserTag(guestUser.getUserTag());
    dto.setAvatarImgUrl(guestUser.getAvatarImgUrl());

    try {
      Message lastChatMessage = messageService.findLastChatMessage(entity.getId(), user.getId());
      dto.setLastMessage(lastChatMessageMapper.convertToDto(lastChatMessage, user));
    } catch (Exception e) {
      dto.setLastMessage(null);
    }
  }
}
