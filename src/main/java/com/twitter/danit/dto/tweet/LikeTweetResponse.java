package com.twitter.danit.dto.tweet;

import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeTweetResponse {
  private final DtoResponseType type = DtoResponseType.TWEET_LIKE;
  private Long id;
  private boolean IsTweetLiked;
  private long likesCount;
  private Long likeUserId;
}
