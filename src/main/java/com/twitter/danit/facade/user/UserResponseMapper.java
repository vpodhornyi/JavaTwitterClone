package com.twitter.danit.facade.user;

import com.twitter.danit.domain.user.CustomStyle;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.user.UserResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.MessageService;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper extends GeneralFacade<User, UserResponse> {
  private final MessageService messageService;
  private final CustomStyleResponseMapper customStyleDtoMapper;

  public UserResponseMapper(MessageService messageService, CustomStyleResponseMapper customStyleDtoMapper) {
    super(User.class, UserResponse.class);
    this.messageService = messageService;
    this.customStyleDtoMapper = customStyleDtoMapper;
  }

  @Override
  protected void decorateDto(UserResponse dto, User entity) {
    dto.setCountUnreadMessages(messageService.getCountAllUnreadChatMessagesByUserId(entity.getId()));
    CustomStyle customStyle = entity.getCustomStyle();

    if (entity.getBio() == null) dto.setBio("");
    if (entity.getLocation() == null) dto.setLocation("");
    if (entity.getHeaderImgUrl() == null) dto.setHeaderImgUrl("");
    if (entity.getAvatarImgUrl() == null) dto.setAvatarImgUrl("");

    if (customStyle != null) {
      dto.setCustomize(customStyleDtoMapper.convertToDto(customStyle));
    }

    dto.setFollowingsCount(entity.getFollowings().size());
    dto.setFollowersCount(entity.getFollowers().size());
  }
}
