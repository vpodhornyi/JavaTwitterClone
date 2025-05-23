package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.domain.tweet.TweetType;
import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.attachment.AttachmentResponse;
import com.twitter.danit.dto.tweet.TweetUser;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class TweetResponse extends AbstractResponse {
  private LocalDateTime createdAt;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;
  private TweetResponse parentTweet;
  //  private Set<TweetActionResponse> actions;
  private String body;
  private TweetUser user;
  private boolean IsTweetOwner;
  private boolean IsTweetReplied;
  private long repliesTweetCount;
  private boolean IsTweetRetweeted;
  private long retweetsCount;
  private boolean IsTweetQuoteTweeted;
  private long quoteTweetsCount;
  private boolean IsTweetLiked;
  private long likesCount;
  private boolean IsTweetViewed;
  private long viewsCount;
  private boolean IsTweetInBookmark;
  private long bookmarksCount;

  public TweetResponse() {
    setMessage("Your Tweet was sent!");
  }
}
