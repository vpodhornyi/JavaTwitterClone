package com.twitter.danit.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserResponse {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String email;
  private String bio;
  private String avatarImgUrl;
  private String headerImgUrl;
  private Integer countUnreadMessages = 0;
}
