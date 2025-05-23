package com.twitter.danit.dto.chat.response.chat;

import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateChatResponse extends ChatResponseAbstract {
  private final DtoResponseType type = DtoResponseType.PRIVATE_CHAT;
  private String avatarImgUrl;
  private String userTag;
  private ChatUser authUser;
  private ChatUser guestUser;
  private final boolean IsPrivate = true;
}
