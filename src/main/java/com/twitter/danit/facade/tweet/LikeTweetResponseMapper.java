package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.LikeTweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class LikeTweetResponseMapper extends GeneralFacade<Tweet, LikeTweetResponse> {
  public LikeTweetResponseMapper() {
    super(Tweet.class, LikeTweetResponse.class);
  }

  @Override
  protected void decorateDto(LikeTweetResponse dto, Tweet entity, User user) {
    dto.setLikesCount(entity.getLikesCount());
    dto.setIsTweetLiked(entity.isTweetLiked(user));
    dto.setLikeUserId(entity.getUser().getId());
  }
}
