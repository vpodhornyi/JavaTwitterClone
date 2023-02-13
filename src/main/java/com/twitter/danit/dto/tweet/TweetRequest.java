package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.domain.tweet.TweetType;
import com.twitter.danit.domain.user.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Data
public class TweetRequest {
  private Long id;
  private TweetType tweetType;
  private ArrayList<String> images;
  private String body;
  private User user;
}
