package com.twitter.danit.dto.notification;

import lombok.Getter;

import java.util.List;

@Getter
public class NotificationReadRequest {
  List<Long> notificationsIds;
}
