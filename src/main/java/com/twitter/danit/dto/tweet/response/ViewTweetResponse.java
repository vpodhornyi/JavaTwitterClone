package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViewTweetResponse extends AbstractResponse {
  private final DtoResponseType type = DtoResponseType.TWEET_VIEW;
  private boolean IsTweetViewed;
  private long viewsCount;
}
