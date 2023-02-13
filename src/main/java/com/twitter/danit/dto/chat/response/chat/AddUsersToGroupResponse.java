package com.twitter.danit.dto.chat.response.chat;

import com.twitter.danit.dto.DtoResponseType;
import com.twitter.danit.dto.chat.ChatUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddUsersToGroupResponse {
  private final DtoResponseType type = DtoResponseType.ADD_TO_GROUP_CHAT;
  private Long chatId;
  private final String key = UUID.randomUUID().toString();
  private final boolean IsAddNewUsers = true;
  private ChatUser user;
  private List<ChatUser> addedUsers;
}
