package com.twitter.danit.domain.notification;

import lombok.Getter;

@Getter
public enum NotificationType {
  LIKE_TWEET("liked your tweet"),
  REPLY_TWEET("replied to your tweet"),
  QUOTE_TWEET("quoted your tweet"),
  RETWEET("retweeted your tweet"),
  FOLLOW("started following you"),
  NEW_CHAT_MESSAGE("sent you a new chat message"),
  ADD_TO_CHAT("added you to a chat");

  private final String messageTemplate;

  NotificationType(String messageTemplate) {
    this.messageTemplate = messageTemplate;
  }
}
