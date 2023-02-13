package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.groupMessage.GroupForeignerMessageResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.response.chat.GroupChatResponseMapper;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupForeignerMessageResponseMapper extends GeneralFacade<Message, GroupForeignerMessageResponse> {
  private final MessageService messageService;
  private final GroupChatResponseMapper groupChatResponseMapper;

  public GroupForeignerMessageResponseMapper(MessageService messageService, GroupChatResponseMapper groupChatResponseMapper) {
    super(Message.class, GroupForeignerMessageResponse.class);
    this.messageService = messageService;
    this.groupChatResponseMapper = groupChatResponseMapper;
  }

  @Override
  protected void decorateDto(GroupForeignerMessageResponse dto, Message entity, User user) {
    Long userId = user.getId();
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    dto.setChat(groupChatResponseMapper.convertToDto(entity.getChat()));
    dto.setCountUnreadMessages(messageService.getCountUnreadChatMessagesByUserId(chatId, userId));
    dto.setCountUnreadAllChatMessages(messageService.getCountAllUnreadChatMessagesByUserId(userId));
    Optional<List<MessageSeen>> seen = entity.getSeen();

    Long lastSeenChatMessageId = messageService.findLastSeenChatMessageId(userId, chatId);
    dto.setLastSeenChatMessageId(lastSeenChatMessageId);


    if (seen.isPresent()) {
      Optional<MessageSeen> optionalMessageSeen = seen.get().stream()
        .filter(e -> e.getUser().equals(user)).findFirst();

      if (optionalMessageSeen.isPresent()) {
        dto.setIsMessageSeen(true);
      }
    }
  }
}
