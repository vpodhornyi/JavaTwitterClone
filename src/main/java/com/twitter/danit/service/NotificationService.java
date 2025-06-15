package com.twitter.danit.service;

import com.twitter.danit.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.twitter.danit.dao.NotificationRepository;
import com.twitter.danit.domain.notification.Notification;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class NotificationService {
  private final NotificationRepository notificationRepository;

  public Page<Notification> getNotReadTweetsPage(int pageNumber, int pageSize, User user) {
    return notificationRepository.getNotReadNotificationByUserReceiver(PageRequest.of(pageNumber, pageSize), user).orElse(Page.empty());
  }

}
