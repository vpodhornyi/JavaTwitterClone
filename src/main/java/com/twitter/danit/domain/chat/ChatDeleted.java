package com.twitter.danit.domain.chat;

import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.chat.Chat;
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
@Table(name = "chats_deleted")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ChatDeleted extends BaseEntity {

  public ChatDeleted(com.twitter.danit.domain.chat.Chat chat, User user) {
    this.setCreatedBy(user.getEmail());
    this.setUpdatedBy(user.getEmail());
    this.chat = chat;
    this.user = user;
  }

  @ManyToOne
  @JoinColumn(name = "chat_id")
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
