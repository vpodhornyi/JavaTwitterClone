package com.twitter.danit.facade.chat.response.chat;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.ChatUser;
import com.twitter.danit.dto.chat.response.chat.GroupChatResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import com.twitter.danit.facade.chat.response.message.LastChatMessageMapper;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupChatResponseMapper extends GeneralFacade<Chat, GroupChatResponse> {
  private final ChatUserMapper chatUserMapper;
  private final MessageService messageService;
  private final LastChatMessageMapper lastChatMessageMapper;

  public GroupChatResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService, LastChatMessageMapper lastChatMessageMapper) {
    super(Chat.class, GroupChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
    this.lastChatMessageMapper = lastChatMessageMapper;
  }

  @Override
  protected void decorateDto(GroupChatResponse dto, Chat entity, User user) {
    List<ChatUser> users = entity.getUsers().stream()
      .map(chatUserMapper::convertToDto)
      .toList();
    dto.setUsers(users);
    dto.setAvatarImgUrl(entity.getAvatarImgUrl());

    try {
      Message lastChatMessage = messageService.findLastChatMessage(entity.getId(), user.getId());
      dto.setLastMessage(lastChatMessageMapper.convertToDto(lastChatMessage, user));

    } catch (Exception e) {
      dto.setLastMessage(null);
    }
  }
}
