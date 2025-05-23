package com.twitter.danit.utils.message;

import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.chat.MessageSeen;
import com.twitter.danit.domain.user.User;

import java.util.List;
import java.util.Optional;

public class ForeignerMessageSeenUtil {
  public static boolean isMessageSeen(Message message, User user) {
    Optional<List<MessageSeen>> optionalSeen = message.getSeen();
    Optional<MessageSeen> optionalMessageSeen = Optional.empty();

    if (optionalSeen.isPresent()) {
      optionalMessageSeen = optionalSeen.get().stream()
        .filter(e -> e.getUser().equals(user))
        .findFirst();
    }

    return optionalMessageSeen.isPresent();
  }
}
