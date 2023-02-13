package com.twitter.danit.dto.chat.response.message.privateMessage;

import com.twitter.danit.dto.chat.response.chat.PrivateChatResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateForeignerMessageResponse extends PrivateMessageResponseAbstract {
  private final boolean IsForeignerMessage = true;
  private Integer countUnreadAllChatMessages = 0;
  private PrivateChatResponse chat;
}
