package com.twitter.danit.dto.chat;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatUser {
  private Long id;
  private String key;
  private String name;
  private String userTag;
  private String avatarImgUrl;
  private LocalDateTime createdAt;
  private boolean IsFollowing;
  private Integer followingsCount;
  private Integer followersCount;
}
