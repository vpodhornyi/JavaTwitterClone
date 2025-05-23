package com.twitter.danit.facade.chat.response.seen;

import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.seen.ForeignerMessageSeenResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class ForeignerMessageSeenResponseMapper extends GeneralFacade<MessageSeen, ForeignerMessageSeenResponse> {
  private final ChatUserMapper chatUserMapper;
  private final MessageService messageService;

  public ForeignerMessageSeenResponseMapper(ChatUserMapper chatUserMapper, MessageService messageService) {
    super(MessageSeen.class, ForeignerMessageSeenResponse.class);
    this.chatUserMapper = chatUserMapper;
    this.messageService = messageService;
  }

  @Override
  protected void decorateDto(ForeignerMessageSeenResponse dto, MessageSeen entity) {
    User user = entity.getUser();
    Long userId = user.getId();
    Long chatId = entity.getMessage().getChat().getId();
    dto.setMessageId(entity.getMessage().getId());
    dto.setChatId(chatId);
    dto.setUser(chatUserMapper.convertToDto(user));
    dto.setCountUnreadSelectedChatMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
  }
}
