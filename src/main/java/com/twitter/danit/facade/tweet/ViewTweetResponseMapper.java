package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.response.ViewTweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ViewTweetResponseMapper extends GeneralFacade<Tweet, ViewTweetResponse> {

  public ViewTweetResponseMapper() {
    super(Tweet.class, ViewTweetResponse.class);
  }

  @Override
  protected void decorateDto(ViewTweetResponse dto, Tweet entity, User user) {
    dto.setViewsCount(entity.getViewsCount());
    dto.setIsTweetViewed(entity.isTweetViewed(user));
  }
}
