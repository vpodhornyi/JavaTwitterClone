package com.twitter.danit.domain.notification;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification extends BaseEntity {

  @Enumerated(EnumType.STRING)
  private NotificationType notificationType;

  @ManyToOne
  @JoinColumn(name = "receiver_id")
  private User userReceiver;

  @ManyToOne
  @JoinColumn(name = "initiator_id")
  private User userInitiator;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  private boolean isRead;
}
