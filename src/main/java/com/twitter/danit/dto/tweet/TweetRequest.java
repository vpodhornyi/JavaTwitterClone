package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.tweet.TweetCanReply;
import com.twitter.danit.domain.tweet.TweetType;
import lombok.Data;

import java.util.ArrayList;

@Data
public class TweetRequest {
  private Long parentTweetId;
  private TweetType tweetType;
  private TweetCanReply tweetCanReply;
  private ArrayList<String> images;
  private String body;
}
