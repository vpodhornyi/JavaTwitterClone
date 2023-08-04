package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeTweetResponse extends AbstractTweetResponse {
  private final DtoResponseType type = DtoResponseType.TWEET_LIKE;
  private boolean IsTweetLiked;
  private long likesCount;
}
