package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.response.RetweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class RetweetResponseMapper extends GeneralFacade<Tweet, RetweetResponse> {
  public RetweetResponseMapper() {
    super(Tweet.class, RetweetResponse.class);
  }

  @Override
  protected void decorateDto(RetweetResponse dto, Tweet entity, User user) {
   dto.setRetweetsCount(entity.getRetweetsCount());
   dto.setIsTweetRetweeted(entity.isTweetRetweeted(user));
  }
}
