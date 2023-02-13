package com.twitter.danit.dto.chat.response.message;

import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.ChatUser;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public abstract class MessageResponseAbstract {
  private Long id;
  private DtoResponseType type = DtoResponseType.MESSAGE_ADD;
  private String oldKey;
  private String key;
  private String text;
  private LocalDateTime createdAt;
  private Long chatId;
  private ChatUser user;
  private Integer countUnreadMessages = 0;
  private Long lastSeenChatMessageId;
}
