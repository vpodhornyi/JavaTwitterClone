package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.dto.tweet.response.bookmark.ClearBookmarksTweetsResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class ClearBookmarksTweetsResponseMapper extends GeneralFacade<Tweet, ClearBookmarksTweetsResponse> {
  public ClearBookmarksTweetsResponseMapper() {
    super(Tweet.class, ClearBookmarksTweetsResponse.class);
  }

  @Override
  protected void decorateDto(ClearBookmarksTweetsResponse dto, Tweet entity) {
    dto.setBookmarksCount(entity.getBookmarksCount());
  }
}
