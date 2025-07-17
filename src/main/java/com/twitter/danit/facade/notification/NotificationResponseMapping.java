package com.twitter.danit.facade.notification;

import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.dto.notification.NotificationResponse;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.NotificationService;
import org.springframework.stereotype.Service;



@Service
public class NotificationResponseMapping extends GeneralFacade<Notification, NotificationResponse> {
  private final NotificationService notificationService;

  public NotificationResponseMapping(NotificationService notificationService) {
    super(Notification.class, NotificationResponse.class);
    this.notificationService = notificationService;
  }

  @Override
  protected void decorateDto(NotificationResponse dto, Notification entity) {
    dto.setType(entity.getNotificationType());
    Integer countUnreadNotification = notificationService.getCountUnreadNotification(entity.getUserReceiver());
    dto.setCountUnreadNotifications(countUnreadNotification);
  }
}
