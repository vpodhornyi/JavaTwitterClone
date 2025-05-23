package com.twitter.danit.dto.chat.response.message.privateMessage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateMessageOwnerResponse extends PrivateMessageResponseAbstract {
  private final boolean IsMessageOwner = true;
}
