package com.twitter.danit.facade.chat.response.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.response.message.privateMessage.PrivateForeignerMessageResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.utils.message.ForeignerMessageSeenUtil;
import org.springframework.stereotype.Service;

@Service
public class PagePrivateForeignerMessageResponseMapper extends GeneralFacade<Message, PrivateForeignerMessageResponse> {

  public PagePrivateForeignerMessageResponseMapper() {
    super(Message.class, PrivateForeignerMessageResponse.class);
  }

  @Override
  protected void decorateDto(PrivateForeignerMessageResponse dto, Message entity, User user) {
    dto.setChatId(entity.getChat().getId());
    dto.setIsMessageSeen(ForeignerMessageSeenUtil.isMessageSeen(entity, user));
  }
}
