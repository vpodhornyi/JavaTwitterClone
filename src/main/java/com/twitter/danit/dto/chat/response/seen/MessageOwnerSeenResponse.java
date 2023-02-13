package com.twitter.danit.dto.chat.response.seen;

import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.response.seen.MessageSeenResponseAbstract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageOwnerSeenResponse extends MessageSeenResponseAbstract {
  private final DtoResponseType type = DtoResponseType.MESSAGE_OWNER_SEEN;
}
