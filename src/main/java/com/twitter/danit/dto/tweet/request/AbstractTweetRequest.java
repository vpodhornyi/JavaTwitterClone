package com.twitter.danit.dto.tweet.request;

import com.twitter.danit.domain.tweet.TweetCanReply;
import lombok.Data;

import java.util.ArrayList;

@Data
public abstract class AbstractTweetRequest {
  private Long parentTweetId;
  private TweetCanReply tweetCanReply;
  private ArrayList<String> images;
  private String body;
}
