package com.twitter.danit.dto.tweet.request;

import com.twitter.danit.domain.tweet.TweetType;
import lombok.Getter;

@Getter
public class QuoteTweetRequest extends AbstractTweetRequest {
  final TweetType tweetType = TweetType.QUOTE_TWEET;
}
