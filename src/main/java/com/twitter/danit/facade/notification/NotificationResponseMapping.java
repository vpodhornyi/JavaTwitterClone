package com.twitter.danit.facade.notification;

import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.dto.notification.NotificationResponse;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;



@Service
public class NotificationResponseMapping extends GeneralFacade<Notification, NotificationResponse> {
  public NotificationResponseMapping() {
    super(Notification.class, NotificationResponse.class);
  }

  @Override
  protected void decorateDto(NotificationResponse dto, Notification entity) {
    dto.setMessage(entity.getNotificationType().getMessageTemplate());
  }
}
