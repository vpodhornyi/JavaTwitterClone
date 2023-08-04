package com.twitter.danit.dto.tweet.request;

import com.twitter.danit.domain.tweet.TweetType;
import lombok.Getter;

@Getter
public class ReplyTweetRequest extends AbstractTweetRequest {
  final TweetType tweetType = TweetType.REPLY_TWEET;
}
