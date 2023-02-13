package com.twitter.danit.facade.chat.response.seen;

import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.dto.chat.response.seen.MessageOwnerSeenResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.chat.ChatUserMapper;
import org.springframework.stereotype.Service;

@Service
public class MessageOwnerSeenResponseMapper extends GeneralFacade<MessageSeen, MessageOwnerSeenResponse> {
  private final ChatUserMapper chatUserMapper;

  public MessageOwnerSeenResponseMapper(ChatUserMapper chatUserMapper) {
    super(MessageSeen.class, MessageOwnerSeenResponse.class);
    this.chatUserMapper = chatUserMapper;
  }

  @Override
  protected void decorateDto(MessageOwnerSeenResponse dto, MessageSeen entity) {
    dto.setMessageId(entity.getMessage().getId());
    dto.setChatId(entity.getMessage().getChat().getId());
    dto.setUser(chatUserMapper.convertToDto(entity.getUser()));
  }
}
