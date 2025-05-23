package com.twitter.danit.dto.action;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.dto.user.UserMinDataResponse;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class TweetActionResponse {

  @Enumerated(EnumType.STRING)
  private ActionType actionType;
  private UserMinDataResponse user;
}
