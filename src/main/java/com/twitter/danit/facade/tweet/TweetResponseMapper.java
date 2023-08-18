package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.response.TweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetResponseMapper extends GeneralFacade<Tweet, TweetResponse> {
  public TweetResponseMapper() {
    super(Tweet.class, TweetResponse.class);
  }

  @Override
  protected void decorateDto(TweetResponse dto, Tweet entity, User user) {
    Tweet parentTweet = entity.getParentTweet();

    if (parentTweet != null) {
      dto.setParentTweet(this.convertToDto(parentTweet, user));
    }

    dto.setIsTweetOwner(entity.getUser().equals(user));

    dto.setRepliesTweetCount(entity.getRepliesTweetCount());
    dto.setIsTweetReplied(entity.isTweetReplied(user));

    dto.setRetweetsCount(entity.getRetweetsCount());
    dto.setIsTweetRetweeted(entity.isTweetRetweeted(user));

    dto.setQuoteTweetsCount(entity.getQuoteTweetsCount());
    dto.setIsTweetQuoteTweeted(entity.isTweetQuoteTweeted(user));

    dto.setLikesCount(entity.getLikesCount());
    dto.setIsTweetLiked(entity.isTweetLiked(user));

    dto.setViewsCount(entity.getViewsCount());
    dto.setIsTweetViewed(entity.isTweetViewed(user));

    dto.setBookmarksCount(entity.getBookmarksCount());
    dto.setIsTweetInBookmark(entity.isTweetInBookmark(user));
  }
}
