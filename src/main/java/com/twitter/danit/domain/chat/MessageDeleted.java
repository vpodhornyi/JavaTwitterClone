package com.twitter.danit.domain.chat;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "messages_deleted")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MessageDeleted extends BaseEntity {
  public MessageDeleted(Message message, User user) {
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
