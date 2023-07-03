package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.chat.ChatUser;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetUserMapper  extends GeneralFacade<User, ChatUser> {
  public TweetUserMapper() {
    super(User.class, ChatUser.class);
  }
}
