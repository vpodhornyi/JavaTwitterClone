package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.dto.AbstractResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteTweetResponse extends AbstractResponse {
  public DeleteTweetResponse(Long tweetId) {
    setId(tweetId);
    setMessage("Your Tweet was deleted!");
  }
}
