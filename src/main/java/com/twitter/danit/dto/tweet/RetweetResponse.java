package com.twitter.danit.dto.tweet;

import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RetweetResponse {
  private final DtoResponseType type = DtoResponseType.RETWEET;
  private Long id;
  private boolean IsTweetRetweeted;
  private long retweetsCount;
}
