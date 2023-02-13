package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.dto.tweet.TweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetResponseMapper extends GeneralFacade<Tweet, TweetResponse> {
  public TweetResponseMapper() {
    super(Tweet.class, TweetResponse.class);
  }

  @Override
  public void decorateEntity(Tweet entity, TweetResponse dto) {

  }


}
