package com.twitter.danit.dto.tweet.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteTweetResponse extends AbstractTweetResponse {
  public DeleteTweetResponse(Long tweetId) {
    setId(tweetId);
    setMessage("Your Tweet was deleted!");
  }
}
