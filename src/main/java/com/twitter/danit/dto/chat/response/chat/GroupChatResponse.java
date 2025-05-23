package com.twitter.danit.dto.chat.response.chat;

import com.twitter.danit.dto.chat.ChatUser;
import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.response.chat.ChatResponseAbstract;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupChatResponse extends ChatResponseAbstract {
  private final DtoResponseType type = DtoResponseType.GROUP_CHAT;
  private List<ChatUser> users;
  private String avatarImgUrl;
  private final boolean IsGroup = true;
}
