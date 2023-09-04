package com.twitter.danit.dto.tweet.response.bookmark;

import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkTweetResponse extends AbstractResponse {
  private final DtoResponseType type = DtoResponseType.TWEET_BOOKMARK;
  private boolean IsTweetInBookmark;
  private boolean IsTweetNotInBookmark;
  private long bookmarksCount;
}
