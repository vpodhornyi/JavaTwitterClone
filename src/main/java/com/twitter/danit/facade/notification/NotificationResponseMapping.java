package com.twitter.danit.facade.notification;

import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.notification.NotificationResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.facade.user.UserResponseMapper;
import com.twitter.danit.service.NotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationResponseMapping extends GeneralFacade<Notification, NotificationResponse> {
  private final NotificationService notificationService;
  private final UserResponseMapper userResponseMapper;

  public NotificationResponseMapping(NotificationService notificationService, UserResponseMapper userResponseMapper) {
    super(Notification.class, NotificationResponse.class);
    this.notificationService = notificationService;
    this.userResponseMapper = userResponseMapper;
  }

  @Override
  protected void decorateDto(NotificationResponse dto, Notification entity) {
    User userReceiver = entity.getUserReceiver();
    User userInitiator = entity.getUserInitiator();
    dto.setType(entity.getNotificationType());
    Integer countUnreadNotification = notificationService.getCountUnreadNotification(userReceiver);
    dto.setCountUnreadNotifications(countUnreadNotification);
    dto.setUserReceiver(userResponseMapper.convertToDto(entity.getUserReceiver(), userInitiator));
    dto.setUserInitiator(userResponseMapper.convertToDto(entity.getUserInitiator(), userReceiver));
  }
}
