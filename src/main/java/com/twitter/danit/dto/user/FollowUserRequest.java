package com.twitter.danit.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowUserRequest {
  private Long followUserId;
}
