package com.twitter.danit.dto.auth.google;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleTokenResponse {
  @JsonProperty("access_token")
  private String accessToken;

  @JsonProperty("id_token")
  private String idToken;

  @JsonProperty("expires_in")
  private Long expiresIn;

  @JsonProperty("token_type")
  private String tokenType;

  @JsonProperty("refresh_token")
  private String refreshToken;

  private String scope;
}
