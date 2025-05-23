package com.twitter.danit.facade.chat.response.chat;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.chat.LeaveChatResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class LeaveChatResponseMapper extends GeneralFacade<Chat, LeaveChatResponse> {
  private final ChatUserMapper chatUserMapper;

  private final MessageService messageService;
  public LeaveChatResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService) {
    super(Chat.class, LeaveChatResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(LeaveChatResponse dto, Chat entity, User user) {
    dto.setChatId(entity.getId());
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(user.getId()));
  }
}
