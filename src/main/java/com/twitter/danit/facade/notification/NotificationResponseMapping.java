package com.twitter.danit.facade.notification;

import com.twitter.danit.dto.notification.NotificationResponse;
import com.twitter.danit.facade.GeneralFacade;

import javax.management.Notification;

public class NotificationResponseMapping extends GeneralFacade<Notification, NotificationResponse> {
  public NotificationResponseMapping() {
    super(Notification.class, NotificationResponse.class);
  }
}
