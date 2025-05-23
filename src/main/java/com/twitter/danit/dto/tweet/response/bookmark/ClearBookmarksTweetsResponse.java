package com.twitter.danit.dto.tweet.response.bookmark;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClearBookmarksTweetsResponse {
  private Long id;
  private long bookmarksCount;
}
