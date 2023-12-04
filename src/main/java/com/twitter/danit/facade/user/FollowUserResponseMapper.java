package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.FollowUserResponse;
import org.springframework.stereotype.Service;

@Service
public class FollowUserResponseMapper {
  private final FollowUserResponse followUserResponse = new FollowUserResponse();

  public FollowUserResponse getFollowUserResponse(User followUser, boolean isFollow, User authUser) {
    followUserResponse.setId(followUser.getId());
    followUserResponse.setShowMessage(true);

    followUserResponse.setAuthUserId(authUser.getId());
    followUserResponse.setFollowingsCount(authUser.getFollowingsCount());
    followUserResponse.setFollowersCount(authUser.getFollowersCount());

    if (isFollow) {
      followUserResponse.setMessage("You unfollowed @" + followUser.getUserTag());
    } else {
      followUserResponse.setMessage("You followed @" + followUser.getUserTag());
    }

    return followUserResponse;
  }
}
