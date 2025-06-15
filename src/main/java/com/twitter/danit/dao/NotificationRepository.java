package com.twitter.danit.dao;

import org.springframework.data.domain.Page;
import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

  Optional<Page<Notification>> getNotReadNotificationByUserReceiver(PageRequest pageable, User user);
}
