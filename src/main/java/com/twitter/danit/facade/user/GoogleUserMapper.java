package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.AuthProvider;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.auth.google.GoogleUserInfo;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class GoogleUserMapper extends GeneralFacade<User, GoogleUserInfo> {
  private final UserService userService;

  public GoogleUserMapper(UserService userService) {
    super(User.class, GoogleUserInfo.class);
    this.userService = userService;
  }

  private void decorateEntity(GoogleUserInfo dto, User entity) {
    entity.setUserTag(userService.generateUserTag(dto.getName()));
    entity.setProvider(AuthProvider.GOOGLE);
    entity.setPassword(null);
    entity.setBirthDate(null);
    entity.setAvatarImgUrl(dto.getPicture());
  }
}
