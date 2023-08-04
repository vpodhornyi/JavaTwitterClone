package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.response.BookmarkTweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class BookmarkTweetResponseMapper extends GeneralFacade<Tweet, BookmarkTweetResponse> {
  public BookmarkTweetResponseMapper() {
    super(Tweet.class, BookmarkTweetResponse.class);
  }

  @Override
  protected void decorateDto(BookmarkTweetResponse dto, Tweet entity, User user) {
    dto.setIsTweetInBookmark(entity.isTweetInBookmark(user));
    dto.setIsTweetNotInBookmark(!entity.isTweetInBookmark(user));
  }
}
