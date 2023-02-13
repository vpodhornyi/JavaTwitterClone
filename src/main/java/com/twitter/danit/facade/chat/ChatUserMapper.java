package com.twitter.danit.facade.chat;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.ChatUser;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ChatUserMapper extends GeneralFacade<User, ChatUser> {
  public ChatUserMapper() {
    super(User.class, ChatUser.class);
  }
}
