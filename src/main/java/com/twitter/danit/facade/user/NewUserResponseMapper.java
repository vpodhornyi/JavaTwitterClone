package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.NewUserResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.auth.JwtAuthService;
import org.springframework.stereotype.Service;

@Service
public class NewUserResponseMapper extends GeneralFacade<User, NewUserResponse> {
  private final JwtAuthService jwtAuthService;
  public NewUserResponseMapper(JwtAuthService jwtAuthService) {
    super(User.class, NewUserResponse.class);
    this.jwtAuthService = jwtAuthService;
  }

  @Override
  protected void decorateDto(NewUserResponse dto, User entity) {
    dto.setJwt(jwtAuthService.getJwtResponse(entity));
  }
}
