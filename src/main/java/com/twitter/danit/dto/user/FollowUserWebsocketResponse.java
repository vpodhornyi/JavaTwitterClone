package com.twitter.danit.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowUserWebsocketResponse {
  private final String type = "FOLLOW_USER";
  private Long authUserId;
  private Integer followingsCount;
  private Integer followersCount;
  private boolean IsFollowing;
}
