package com.twitter.danit.facade.notification;

import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.dto.notification.PageNotificationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PageNotificationResponseMapper  {
  private final NotificationResponseMapping notificationResponseMapping;
  private final PageNotificationResponse dto = new PageNotificationResponse();

  public PageNotificationResponse convertToDto(Page<Notification> entity) {
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Notification> notifications = entity.getContent();

    dto.setElements(notifications.isEmpty() ? new ArrayList<>() : notifications.stream().map(notificationResponseMapping::convertToDto).toList());

    return dto;
  }
}
