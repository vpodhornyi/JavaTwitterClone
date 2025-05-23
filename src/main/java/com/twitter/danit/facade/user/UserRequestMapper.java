package com.twitter.danit.facade.user;

import com.twitter.danit.dao.UserRepository;
import com.twitter.danit.domain.user.BackgroundColor;
import com.twitter.danit.domain.user.Color;
import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UserRequestMapper extends GeneralFacade<User, UserRequest> {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final Random rand;

  public UserRequestMapper(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    super(User.class, UserRequest.class);
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.rand = new Random();
  }

  @Override
  protected void decorateEntity(User entity, UserRequest dto) {

    String userTagGenerate = dto.getName().replaceAll("\\s+", "").toLowerCase() + dto.getBirthDate().getYear();
    Optional<User> optionalUser = userRepository.findByUserTag(userTagGenerate);

    while (optionalUser.isPresent()) {
      int randomNumber = rand.nextInt(9);
      userTagGenerate = userTagGenerate + randomNumber;
      optionalUser = userRepository.findByUserTag(userTagGenerate);
    }

    entity.setUserTag(userTagGenerate);
    entity.setPassword(passwordEncoder.encode(dto.getPassword()));
    entity.setCustomStyle(new CustomStyle());
  }
}
