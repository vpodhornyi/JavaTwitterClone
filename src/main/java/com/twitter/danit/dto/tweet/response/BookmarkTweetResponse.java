package com.twitter.danit.dto.tweet.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkTweetResponse extends AbstractTweetResponse{
  private boolean IsTweetInBookmark;
  private boolean IsTweetNotInBookmark;
}
