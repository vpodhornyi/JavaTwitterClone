package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.FollowUserWebsocketResponse;
import org.springframework.stereotype.Service;

@Service
public class FollowUserWebsocketResponseMapper {
  private final FollowUserWebsocketResponse followUserWebsocketResponse = new FollowUserWebsocketResponse();

  public FollowUserWebsocketResponse convertToDto(User followUser, User authUser) {
    followUserWebsocketResponse.setAuthUserId(followUser.getId());
    followUserWebsocketResponse.setFollowingsCount(followUser.getFollowingsCount());
    followUserWebsocketResponse.setFollowersCount(followUser.getFollowersCount());
    followUserWebsocketResponse.setIsFollowing(followUser.isFollowUser(authUser));

    return followUserWebsocketResponse;
  }
}
