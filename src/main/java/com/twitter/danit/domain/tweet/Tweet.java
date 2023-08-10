package com.twitter.danit.domain.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.twitter.danit.domain.BaseEntity;
import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tweets")
@Getter
@Setter
@NoArgsConstructor
public class Tweet extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "parent_tweet_id")
  private Tweet parentTweet;

  @Enumerated(EnumType.STRING)
  private TweetType tweetType;

  @Enumerated(EnumType.STRING)
  private TweetCanReply tweetCanReply;

  @Column(columnDefinition = "TEXT")
  private String body;

  @LazyCollection(LazyCollectionOption.EXTRA)
  @ManyToOne
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
  private Set<AttachmentImage> images = new HashSet<>();

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Notification> notifications = new HashSet<>();

  @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL, orphanRemoval = true)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<TweetAction> actions = new HashSet<>();

  public void addTweetAction(ActionType actionType, User user) {
    actions.add(new TweetAction(actionType, this, user));
  }

  public void deleteTweetAction(TweetAction tweetAction) {
    actions.remove(tweetAction);
    tweetAction.setTweet(null);
  }

  public long getRepliesTweetCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.REPLY_TWEET)).count();
  }

  public long getRetweetsCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.RETWEET)).count();
  }

  public long getQuoteTweetsCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.QUOTE_TWEET)).count();
  }

  public long getLikesCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.LIKE)).count();
  }

  public long getViewsCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.VIEW)).count();
  }

  public long getBookmarksCount() {
    return actions.stream().filter(a -> a.getActionType().equals(ActionType.BOOKMARK)).count();
  }

  public boolean isTweetReplied(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) && a.getActionType().equals(ActionType.REPLY_TWEET));
  }

  public boolean isTweetRetweeted(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) && a.getActionType().equals(ActionType.RETWEET));
  }

  public boolean isTweetQuoteTweeted(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) && a.getActionType().equals(ActionType.QUOTE_TWEET));
  }

  public boolean isTweetLiked(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) && a.getActionType().equals(ActionType.LIKE));
  }

  public boolean isTweetInBookmark(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) && a.getActionType().equals(ActionType.BOOKMARK));
  }

  public boolean isTweetViewed(User user) {
    return actions.stream().anyMatch(a -> a.getUser().equals(user) &&
        a.getActionType().equals(ActionType.VIEW) &&
        !this.getUser().equals(user));
  }

  @Override
  public String toString() {
    return "Tweet{" + "tweetType=" + tweetType + ", body='" + body + '\'' + ", user=" + user + ", images=" + images
        + ", notifications=" + notifications + ", actions=" + actions + '}';
  }
}
