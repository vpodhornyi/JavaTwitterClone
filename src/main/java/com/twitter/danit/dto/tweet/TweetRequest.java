package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.tweet.TweetCanReply;
import com.twitter.danit.domain.tweet.TweetType;
import lombok.Data;

import java.util.ArrayList;

@Data
public class TweetRequest {
  private TweetType tweetType;
  private TweetCanReply canReply;
  private ArrayList<String> images;
  private String body;
}
