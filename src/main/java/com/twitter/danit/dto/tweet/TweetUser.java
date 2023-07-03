package com.twitter.danit.dto.tweet;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetUser {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String avatarImgUrl;
}
