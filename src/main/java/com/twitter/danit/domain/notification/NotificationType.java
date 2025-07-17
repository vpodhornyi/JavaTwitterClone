package com.twitter.danit.domain.notification;

import lombok.Getter;

@Getter
public enum NotificationType {
  LIKE_TWEET,
  REPLY_TWEET,
  QUOTE_TWEET,
  RETWEET,
  FOLLOW,
  NEW_CHAT_MESSAGE,
  ADD_TO_CHAT
}
