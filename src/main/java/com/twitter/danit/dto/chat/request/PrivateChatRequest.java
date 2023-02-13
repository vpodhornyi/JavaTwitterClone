package com.twitter.danit.dto.chat.request;

import com.twitter.danit.dto.chat.request.ChatRequestAbstract;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PrivateChatRequest extends ChatRequestAbstract {
  private Long authUserId;
  private Long guestUserId;
}
