package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.response.bookmark.BookmarkTweetResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class BookmarkTweetResponseMapper extends GeneralFacade<Tweet, BookmarkTweetResponse> {
  public BookmarkTweetResponseMapper() {
    super(Tweet.class, BookmarkTweetResponse.class);
  }

  @Override
  protected void decorateDto(BookmarkTweetResponse dto, Tweet entity, User user) {
    boolean tweetInBookmark = entity.isTweetInBookmark(user);
    dto.setBookmarksCount(entity.getBookmarksCount());
    dto.setIsTweetInBookmark(tweetInBookmark);
    dto.setIsTweetNotInBookmark(!tweetInBookmark);
    dto.setMessage(tweetInBookmark ? "Post added to your Bookmarks" : "Post removed from your Bookmarks");
  }
}
