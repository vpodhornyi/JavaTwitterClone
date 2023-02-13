package com.twitter.danit.dto.chat.response;

import com.twitter.danit.dto.chat.response.message.MessageResponseAbstract;
import com.twitter.danit.dto.chat.response.seen.MessageOwnerSeenResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupMessageResponse extends MessageResponseAbstract {
  private final boolean IsGroupChat = true;
  private List<MessageOwnerSeenResponse> messagesSeen;
}
