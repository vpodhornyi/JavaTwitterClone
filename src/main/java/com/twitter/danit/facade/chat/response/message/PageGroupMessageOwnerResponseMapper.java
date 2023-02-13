package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.groupMessage.GroupMessageOwnerResponse;
import com.twitter.danit.dto.chat.response.seen.MessageOwnerSeenResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.response.seen.MessageOwnerSeenResponseMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PageGroupMessageOwnerResponseMapper extends GeneralFacade<Message, GroupMessageOwnerResponse> {
  private final MessageOwnerSeenResponseMapper messageOwnerSeenResponseMapper;

  public PageGroupMessageOwnerResponseMapper(MessageOwnerSeenResponseMapper messageOwnerSeenResponseMapper) {
    super(Message.class, GroupMessageOwnerResponse.class);
    this.messageOwnerSeenResponseMapper = messageOwnerSeenResponseMapper;
  }

  @Override
  protected void decorateDto(GroupMessageOwnerResponse dto, Message entity, User user) {
    Long chatId = entity.getChat().getId();
    dto.setChatId(chatId);
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (seen.isPresent()) {
      List<MessageOwnerSeenResponse> messagesDto = seen.get().stream()
        .filter(e -> !e.getUser().equals(user))
        .map(messageOwnerSeenResponseMapper::convertToDto).toList();
      dto.setMessagesSeen(messagesDto);
    } else {
      dto.setMessagesSeen(new ArrayList<>());
    }
  }
}
