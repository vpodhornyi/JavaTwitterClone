package com.twitter.danit.domain.chat;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.chat.Message;
import com.twitter.danit.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "messages_seen")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MessageSeen extends BaseEntity {

  public MessageSeen(com.twitter.danit.domain.chat.Message message, User user) {
    this.setCreatedBy(user.getEmail());
    this.setUpdatedBy(user.getEmail());
    this.message = message;
    this.user = user;
  }

  @ManyToOne
  @JoinColumn(name = "message_id")
  private Message message;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
