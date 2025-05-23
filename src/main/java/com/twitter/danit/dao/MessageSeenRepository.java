package com.twitter.danit.dao;

import com.twitter.danit.domain.chat.MessageSeen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface MessageSeenRepository extends JpaRepository<MessageSeen, Long> {
  Optional<MessageSeen> findByUserIdAndMessageId(Long userId, Long messageId);
}
