package com.twitter.danit.service;

import com.twitter.danit.dao.NotificationTemplatesRepository;
import com.twitter.danit.domain.chat.Chat;
import com.twitter.danit.domain.notification.LocaleType;
import com.twitter.danit.domain.notification.NotificationTemplate;
import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.twitter.danit.dao.NotificationRepository;
import com.twitter.danit.domain.notification.Notification;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class NotificationService {
  private final NotificationTemplatesRepository templatesRepository;
  private final NotificationRepository notificationRepository;
  private final Map<NotificationType, Map<LocaleType, String>> templateCache = new HashMap<>();

  @Autowired
  public NotificationService(NotificationTemplatesRepository templatesRepository, NotificationRepository notificationRepository) {
    this.templatesRepository = templatesRepository;
    this.notificationRepository = notificationRepository;
    loadTemplatesIntoCache();
  }

  private void loadTemplatesIntoCache() {
    List<NotificationTemplate> templates = templatesRepository.findAll();

    for (NotificationTemplate template : templates) {
      templateCache
          .computeIfAbsent(template.getNotificationType(), k -> new HashMap<>())
          .put(template.getLocaleType(), template.getMessage());
    }
  }

  public void refreshTemplateCache() {
    templateCache.clear();
    loadTemplatesIntoCache();
  }

  public String getTemplate(NotificationType type, LocaleType locale) {
    return templateCache
        .getOrDefault(type, Collections.emptyMap())
        .getOrDefault(locale, "Template not found");
  }

  private Notification createNotification(
      NotificationType type,
      User userInitiator,
      User userReceiver,
      Tweet tweet,
      Chat chat
  ) {
    String template = getTemplate(type, LocaleType.en);
    String message = userInitiator.getName() + ' ' + template;

    Notification notification = new Notification();
    notification.setNotificationType(type);
    notification.setUserInitiator(userInitiator);
    notification.setUserReceiver(userReceiver);
    notification.setTweet(tweet);
    notification.setChat(chat);
    notification.setMessage(message);
    notification.setCreatedAt(LocalDateTime.now());

    notificationRepository.save(notification);

    return notification;
  }

  public boolean isLikeTweetNotificationNotExist(Tweet tweet, User user) {
    Optional<Notification> optionalNotification = notificationRepository
        .findByTweetAndUserInitiatorAndNotificationType(tweet, user, NotificationType.LIKE_TWEET);
    return optionalNotification.isEmpty();
  }

  public Integer getCountUnreadNotification(User user) {
    Optional<Integer> optionalInteger = notificationRepository.getCountOfNotReadNotification(user.getId());
    return optionalInteger.orElse(0);
  }

  public Notification likeTweetNotification(User userInitiator, Tweet tweet) {
    User userReceiver = tweet.getUser();
    return createNotification(
        NotificationType.LIKE_TWEET,
        userInitiator,
        userReceiver,
        tweet,
        null
    );
  }

  public Notification addUserToChat(User userInitiator, Chat chat, User userReceiver) {
    return createNotification(
        NotificationType.ADD_TO_CHAT,
        userInitiator,
        userReceiver,
        null,
        chat
    );
  }

  public Notification followUser(User userInitiator, User userReceiver) {
    return createNotification(
        NotificationType.FOLLOW,
        userInitiator,
        userReceiver,
        null,
        null
    );
  }

  public Notification unfollowUser(User userInitiator, User userReceiver) {
    return createNotification(
        NotificationType.UNFOLLOW,
        userInitiator,
        userReceiver,
        null,
        null
    );
  }

  public Page<Notification> getNotReadTweetsPage(int pageNumber, int pageSize, User user) {
    return notificationRepository
        .getNotReadNotificationByUserReceiverOrderByCreatedAtDesc(PageRequest.of(pageNumber, pageSize), user).orElse(Page.empty());
  }

  @Transactional
  public void markAsReadByIds(List<Long> ids, User user) {
    notificationRepository.markAsReadByIds(ids, user.getId());
  }
}
