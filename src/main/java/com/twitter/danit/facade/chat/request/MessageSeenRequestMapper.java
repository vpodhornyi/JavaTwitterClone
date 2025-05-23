package com.twitter.danit.facade.chat.request;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.request.MessageSeenRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class MessageSeenRequestMapper extends GeneralFacade<MessageSeen, MessageSeenRequest> {
  private final MessageService messageService;

  public MessageSeenRequestMapper(MessageService messageService) {
    super(MessageSeen.class, MessageSeenRequest.class);
    this.messageService = messageService;
  }

  @Override
  protected void decorateEntity(MessageSeen entity, MessageSeenRequest dto, User user) {
    Message message = messageService.findById(dto.getMessageId());
    entity.setUser(user);
    entity.setMessage(message);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
  }
}
