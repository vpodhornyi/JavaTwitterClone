package com.twitter.danit.facade.chat.request;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.request.MessageRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.ChatService;
import org.springframework.stereotype.Service;

@Service
public class MessageRequestMapper extends GeneralFacade<Message, MessageRequest> {
  private final ChatService chatService;

  public MessageRequestMapper(ChatService chatService) {
    super(Message.class, MessageRequest.class);
    this.chatService = chatService;
  }

  @Override
  protected void decorateEntity(Message entity, MessageRequest dto, User user) {
    entity.setUser(user);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
    entity.addSeen(user);

    Long chatId = dto.getChatId();
    Chat chat = chatService.findById(chatId);
    entity.setChat(chat);
  }
}
