package com.twitter.danit.dao;

import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.domain.tweet.Tweet;
import org.springframework.data.domain.Page;
import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

  Optional<Page<Notification>> getNotReadNotificationByUserReceiverOrderByCreatedAtDesc(PageRequest pageable, User user);

  Optional<Notification> findByTweetAndUserInitiatorAndNotificationType(Tweet tweet, User user, NotificationType notificationType);

  @Query(value = """
      select count(*) from notifications n
      where n.receiver_id = :userId
      and n.is_read = false
      """,
      nativeQuery = true)
  Optional<Integer> getCountOfNotReadNotification(Long userId);

  @Modifying
  @Query("UPDATE Notification n SET n.isRead = true WHERE n.id IN :ids AND n.userReceiver.id = :userId")
  void markAsReadByIds(@Param("ids") List<Long> ids, @Param("userId") Long userId);
}
