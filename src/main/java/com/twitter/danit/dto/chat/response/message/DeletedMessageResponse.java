package com.twitter.danit.dto.chat.response.message;

import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.response.message.LastChatMessageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeletedMessageResponse {
  private Long chatId;
  private Long messageId;
  private DtoResponseType type = DtoResponseType.MESSAGE_DELETE;
  private LastChatMessageResponse lastMessage;
}
