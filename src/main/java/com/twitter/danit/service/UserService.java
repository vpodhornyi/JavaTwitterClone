package com.twitter.danit.service;

import com.twitter.danit.dao.UserRepository;
import com.twitter.danit.domain.user.BackgroundColor;
import com.twitter.danit.domain.user.Color;
import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.CustomStyleRequest;
import com.twitter.danit.dto.user.UserRequest;
import com.twitter.danit.exception.AccountAlreadyExistException;
import com.twitter.danit.exception.CouldNotFindAccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

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
    LocalDate birthDate = userRequest.getBirthDate();
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
    user.setBirthDate(birthDate);
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

  public User findByIdTrowException(Long userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isPresent()) {
      return optionalUser.get();
    }
    throw new CouldNotFindAccountException();
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

  public CustomStyle updateCustomStyle(User user, CustomStyleRequest customStyleRequest) {
    Color color = customStyleRequest.getColor();
    BackgroundColor backgroundColor = customStyleRequest.getBackgroundColor();
    int fontSize = customStyleRequest.getFontSize();
    CustomStyle customStyle = user.getCustomStyle();

    if (customStyle == null) {
      customStyle = new CustomStyle(color, backgroundColor, fontSize);
    } else {
      customStyle.setColor(color);
      customStyle.setBackgroundColor(backgroundColor);
      customStyle.setFontSize(fontSize);
    }

    user.setCustomStyle(customStyle);

    return userRepository.save(user).getCustomStyle();
  }

  public boolean addFollower(User authUser, User followUser) {
    boolean isFollow = authUser.isFollowUser(followUser);

    if (isFollow) {
      authUser.unfollowUser(followUser);
    } else {
      authUser.followUser(followUser);
    }

    this.save(authUser);

    return isFollow;
  }
}
