package com.twitter.danit.service;

import com.twitter.danit.dao.CustomStyleRepository;
import com.twitter.danit.dao.UserRepository;
import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.CustomStyleRequest;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.exception.AccountAlreadyExistException;
import com.twitter.danit.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final CustomStyleRepository customStyleRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(Long id) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public User updateUser(User user, UserRequest userRequest) {
    String name = userRequest.getName();
    String bio = userRequest.getBio();
    String location = userRequest.getLocation();
    String headerImgUrl = userRequest.getHeaderImgUrl();
    String avatarImgUrl = userRequest.getAvatarImgUrl();

//    if (!user.getName().equals(name)) user.setName(name);
//    if (!user.getBio().equals(bio)) user.setBio(bio);
//    if (!user.getLocation().equals(location)) user.setLocation(location);
//    if (!user.getHeaderImgUrl().equals(headerImgUrl)) user.setHeaderImgUrl(headerImgUrl);
//    if (!user.getAvatarImgUrl().equals(avatarImgUrl)) user.setAvatarImgUrl(avatarImgUrl);

    user.setName(name);
    user.setBio(bio);
    user.setLocation(location);
    user.setHeaderImgUrl(headerImgUrl);
    user.setAvatarImgUrl(avatarImgUrl);

    return userRepository.save(user);
  }

  public User createNewUser(User user) {
    Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

    if (optionalUser.isEmpty()) return userRepository.save(user);

    throw new AccountAlreadyExistException(user.getEmail());
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public List<User> getAll() {
    return userRepository.findAll();
  }

  public Boolean deleteUserById(Long id) {
    userRepository.deleteById(id);
    return true;
  }

  public User findByUserTagTrowException(String userTag) {
    Optional<User> optionalUser = userRepository.findByUserTag(userTag);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public User findByUserTag(String userTag) {
    Optional<User> optionalUser = userRepository.findByUserTag(userTag);
    return optionalUser.orElse(null);
  }

  public User findByUserEmailTrowException(String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
  }

  public User findByUserEmail(String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);
    return optionalUser.orElse(null);
  }

  public List<User> findByMatchesInNameOrUserTag(String text) {
    Optional<List<User>> optionalUsers = userRepository.findTop10ByMatchingNameOrUserTag(text);

    return optionalUsers.orElse(Collections.emptyList());
  }

  public User findUser(String login) {
    User user;
    try {
      user = findByUserTagTrowException(login);
    } catch (Exception e) {
      user = findByUserEmailTrowException(login);
    }

    return user;
  }

  public CustomStyle updateCustomStyle(CustomStyle customStyle, CustomStyleRequest customStyleRequest) {
    customStyle.setColor(customStyleRequest.getColor());
    customStyle.setBackgroundColor(customStyleRequest.getBackgroundColor());
    customStyle.setFontSize(customStyleRequest.getFontSize());

    return customStyleRepository.save(customStyle);
  }
}
