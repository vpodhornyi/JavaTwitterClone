package com.twitter.danit.dto.chat.response.message;

import com.twitter.danit.dto.PageAbstract;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageMessagesResponse extends PageAbstract<MessageResponseAbstract> {
  private Long chatId;
  private Long lastSeenChatMessageId;
}
