package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.tweet.TweetType;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.attachment.AttachmentResponse;
import com.twitter.danit.dto.action.TweetActionResponse;
import lombok.Data;

import java.util.Set;

@Data

public class TweetResponse {
  private Long id;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;
  private Set<TweetActionResponse> actions;
  private String body;
  private User user;

}
