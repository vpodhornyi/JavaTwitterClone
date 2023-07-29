package com.twitter.danit.dto.tweet;

import lombok.Data;

@Data
public class DeleteTweetResponse {
  private Long tweetId;
  boolean show = true;
  private final String message = "Tweet was deleted!";

  public DeleteTweetResponse(Long tweetId) {
    this.tweetId = tweetId;
  }
}
