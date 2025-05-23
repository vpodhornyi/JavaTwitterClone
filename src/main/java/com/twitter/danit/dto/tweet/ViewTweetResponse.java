package com.twitter.danit.dto.tweet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewTweetResponse {
  private Long id;
  private boolean IsTweetViewed;
  private long viewsCount;
}
