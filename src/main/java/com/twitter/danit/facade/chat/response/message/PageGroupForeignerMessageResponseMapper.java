package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.groupMessage.GroupForeignerMessageResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PageGroupForeignerMessageResponseMapper extends GeneralFacade<Message, GroupForeignerMessageResponse> {
  public PageGroupForeignerMessageResponseMapper() {
    super(Message.class, GroupForeignerMessageResponse.class);
  }

  @Override
  protected void decorateDto(GroupForeignerMessageResponse dto, Message entity, User user) {
    dto.setChatId(entity.getChat().getId());
    Optional<List<MessageSeen>> seen = entity.getSeen();

    if (seen.isPresent()) {
      Optional<MessageSeen> optionalMessageSeen = seen.get().stream()
        .filter(e -> e.getUser().equals(user)).findFirst();

      if (optionalMessageSeen.isPresent()) {
        dto.setIsMessageSeen(true);
      }
    }
  }
}
