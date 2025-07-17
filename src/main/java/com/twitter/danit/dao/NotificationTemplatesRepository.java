package com.twitter.danit.dao;

import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.notification.NotificationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationTemplatesRepository extends JpaRepository<NotificationTemplate, Long> {

}
