package com.twitter.danit.dto.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequest {
  private String name;
  private String userTag;
  private String email;
  private String password;
  private LocalDate birthDate;
  private String bio;
  private String location;
  private String avatarImgUrl;
  private String headerImgUrl;
}
