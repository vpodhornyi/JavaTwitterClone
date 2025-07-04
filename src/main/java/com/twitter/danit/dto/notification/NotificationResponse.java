package com.twitter.danit.dto.notification;

import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.dto.user.UserResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NotificationResponse {
  private Long id;
  private String message;
  private NotificationType notificationType;
  private UserResponse userInitiator;
  private UserResponse userReceiver;
  private Date createdAt;
  private boolean isIsRead;
}
