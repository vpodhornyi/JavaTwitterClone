package com.twitter.danit.dto.tweet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeTweetResponse {
  private Long id;
  private boolean IsTweetLiked;
  private long likesCount;
}
