package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ViewTweetResponseMapper extends GeneralFacade<Tweet, ViewTweetResponse> {
  public ViewTweetResponseMapper() {
    super(Tweet.class, ViewTweetResponse.class);
  }

  @Override
  protected void decorateDto(ViewTweetResponse dto, Tweet entity, User user) {
    dto.setIsTweetViewed(entity.isTweetViewed(user));
    dto.setViewsCount(entity.getViewsCount(user));
  }
}
