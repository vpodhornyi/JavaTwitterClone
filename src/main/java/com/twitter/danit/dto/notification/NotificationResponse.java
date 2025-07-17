package com.twitter.danit.dto.notification;

import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.dto.user.UserResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationResponse {
  private Long id;
  private String key;
  private String message;
  private boolean showMessage = true;
  private NotificationType type;
  private UserResponse userInitiator;
  private UserResponse userReceiver;
  private LocalDateTime createdAt;
  private Integer countUnreadNotifications = 0;
  private boolean isIsRead;
}
