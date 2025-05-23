package com.twitter.danit.dto.chat.response.chat;

import com.twitter.danit.dto.chat.response.message.LastChatMessageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ChatResponseAbstract {
  private Long id;
  private String key;
  private String oldKey;
  private String title;
  private LastChatMessageResponse lastMessage;
}
