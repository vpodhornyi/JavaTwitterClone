package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.privateMessage.PrivateMessageOwnerResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagePrivateMessageOwnerResponseMapper extends GeneralFacade<Message, PrivateMessageOwnerResponse> {
  public PagePrivateMessageOwnerResponseMapper() {
    super(Message.class, PrivateMessageOwnerResponse.class);
  }

  @Override
  protected void decorateDto(PrivateMessageOwnerResponse dto, Message entity, User user) {
    List<User> users = entity.getChat().getUsers();
    dto.setChatId(entity.getChat().getId());
    Optional<User> optionalUser = users.stream().filter(u -> !u.equals(user)).findFirst();

    if (optionalUser.isPresent()) {
      dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, optionalUser.get()));
    } else {
      dto.setIsMessageSeen(false);
    }
  }
}
