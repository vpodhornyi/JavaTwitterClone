package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.LastChatMessageResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.MessageService;
import com.twitter.danit.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class LastChatMessageMapper extends GeneralFacade<Message, LastChatMessageResponse> {
  private final MessageService messageService;

  public LastChatMessageMapper(MessageService messageService) {
    super(Message.class, LastChatMessageResponse.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(LastChatMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
    dto.setChatId(chatId);
    dto.setIsMessageOwner(user.equals(entity.getUser()));
    dto.setLastSeenChatMessageId(messageService.findLastSeenChatMessageId(userId, chatId));
  }
}
