package com.twitter.danit.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupChatInfoRequest {
  private Long chatId;
  private String imgUrl;
  private String title;
}
