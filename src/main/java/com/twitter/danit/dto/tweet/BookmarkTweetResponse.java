package com.twitter.danit.dto.tweet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkTweetResponse {
  private Long id;
  private boolean IsTweetInBookmark;
  private boolean IsTweetNotInBookmark;
}
