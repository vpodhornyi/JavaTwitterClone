package com.twitter.danit.dto.user;

import com.twitter.danit.dto.AbstractResponse;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FollowUserResponse extends AbstractResponse {
  private Long authUserId;
  private Integer followingsCount;
  private Integer followersCount;

}
