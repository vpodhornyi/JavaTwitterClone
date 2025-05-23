package com.twitter.danit.dto.chat.response.message.groupMessage;

import com.twitter.danit.dto.chat.response.seen.MessageOwnerSeenResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupMessageOwnerResponse extends GroupMessageResponseAbstract {
  private final boolean IsMessageOwner = true;
  private List<MessageOwnerSeenResponse> messagesSeen;
}
