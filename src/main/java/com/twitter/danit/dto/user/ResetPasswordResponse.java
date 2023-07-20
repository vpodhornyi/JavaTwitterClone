package com.twitter.danit.dto.user;

import lombok.Data;

@Data
public class ResetPasswordResponse {
  private final String message = "We send new password to your email!";
}
