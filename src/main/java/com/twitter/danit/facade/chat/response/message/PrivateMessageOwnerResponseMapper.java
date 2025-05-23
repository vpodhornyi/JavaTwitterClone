package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.privateMessage.PrivateMessageOwnerResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.ChatService;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class PrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  private final MessageService messageService;
  private final ChatService chatService;

  public PrivateMessageOwnerResponseMapper(MessageService messageService, ChatService chatService) {
    super(Message.class, PrivateMessageOwnerResponse.class);
    this.messageService = messageService;
    this.chatService = chatService;
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    Chat chat = entity.getChat();
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));

    if (chat.getDeleted().size() > 0) {
      chatService.resetDeletedChat(userId, chatId);
    }
  }
}
