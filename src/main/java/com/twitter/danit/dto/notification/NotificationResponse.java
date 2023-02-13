package com.twitter.danit.dto.notification;

import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NotificationResponse {
  private Long id;
  private NotificationType notificationType;
  private User userInitiator;
  private User userReceiver;
  private Date createdAt;
  private boolean isRead;
}
