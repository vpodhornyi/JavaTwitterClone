package com.twitter.danit.domain.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tweet_actions")
@Getter
@Setter
@NoArgsConstructor
public class TweetAction extends BaseEntity {

  public TweetAction(ActionType actionType, Tweet tweet, User user) {
    this.actionType = actionType;
    this.tweet = tweet;
    this.user = user;
    this.setCreatedBy(user.getEmail());
    this.setUpdatedBy(user.getEmail());
  }

  @Enumerated(EnumType.STRING)
  private ActionType actionType;

  @ManyToOne
  @JoinColumn(name = "tweet_id")
  private Tweet tweet;

  @ManyToOne
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;

  @Override
  public String toString() {
    return "TweetAction{" +
        "actionType=" + actionType +
        ", user=" + user +
        '}';
  }
}
