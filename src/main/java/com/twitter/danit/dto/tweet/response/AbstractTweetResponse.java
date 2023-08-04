package com.twitter.danit.dto.tweet.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractTweetResponse {
  private Long id;
  private String message;
  boolean showMessage = true;
}
