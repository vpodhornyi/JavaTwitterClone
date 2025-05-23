package com.twitter.danit.dto.chat.response.message.groupMessage;

import com.twitter.danit.dto.chat.response.message.MessageResponseAbstract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class GroupMessageResponseAbstract extends MessageResponseAbstract {
  private final boolean IsGroupChat = true;
}
