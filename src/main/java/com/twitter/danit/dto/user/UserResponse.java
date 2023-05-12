package com.twitter.danit.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponse {
  private Long id;
  private LocalDateTime createdAt;
  private LocalDate birthDate;
  private String key;
  private String name;
  private String userTag;
  private String email;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
  private CustomStyleResponse customize;
  private Integer countUnreadMessages = 0;
}
