package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserRequestMapper extends GeneralFacade<User, UserRequest> {
  private final UserService userService;
  private final BCryptPasswordEncoder passwordEncoder;

  public UserRequestMapper(UserService userService, BCryptPasswordEncoder passwordEncoder) {
    super(User.class, UserRequest.class);
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  protected void decorateEntity(User entity, UserRequest dto) {
    entity.setUserTag(userService.generateUserTag(dto.getName()));
    entity.setPassword(passwordEncoder.encode(dto.getPassword()));
    entity.setCustomStyle(new CustomStyle());
  }
}
