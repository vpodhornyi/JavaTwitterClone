package com.twitter.danit.dto.chat.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupChatRequest extends ChatRequestAbstract {
  private Long chatId;
  private List<Long> usersIds;
  private String title;
  private String oldKey;
  private String imgUrl;
}
