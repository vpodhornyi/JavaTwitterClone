package com.twitter.danit.dto.user;

import com.twitter.danit.dto.auth.JwtResponse;
import com.twitter.danit.dto.user.UserResponse;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NewUserResponse extends UserResponse {
  JwtResponse jwt;
}
