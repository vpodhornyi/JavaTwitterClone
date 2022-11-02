package com.twitter.danit.domain.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class JwtRequest {
  @NotBlank(message = "Login is mandatory")
  @Pattern(regexp = "^[\\w!#$%&'*+-/=?^_`{|}~@.]*$", message = "Login has unsupported characters!")
  private String login;

  @NotBlank(message = "Password is mandatory")
  private String password;
}
