package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RetweetResponse extends AbstractResponse {
  private final DtoResponseType tweetType = DtoResponseType.RETWEET;
  private Long id;
  private boolean IsTweetRetweeted;
  private long retweetsCount;
}
