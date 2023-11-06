package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.FollowUserResponse;
import org.springframework.stereotype.Service;

@Service
public class FollowUserResponseMapper {
  private final FollowUserResponse followUserResponse = new FollowUserResponse();

  public FollowUserResponse getFollowUserResponse(User user, boolean isFollow) {
    followUserResponse.setId(user.getId());
    followUserResponse.setShowMessage(true);

    if (isFollow) {
      followUserResponse.setMessage("You unfollowed @" + user.getUserTag());
    } else {
      followUserResponse.setMessage("You followed @" + user.getUserTag());
    }

    return followUserResponse;
  }
}
