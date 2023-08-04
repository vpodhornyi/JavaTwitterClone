package com.twitter.danit.dto.tweet.response;

import com.twitter.danit.domain.tweet.TweetType;
import com.twitter.danit.dto.attachment.AttachmentResponse;
import com.twitter.danit.dto.action.TweetActionResponse;
import com.twitter.danit.dto.tweet.TweetUser;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class TweetResponse extends AbstractTweetResponse {
  private LocalDateTime createdAt;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;
  //  private Set<TweetActionResponse> actions;
  private String body;
  private TweetUser user;
  private boolean IsTweetOwner;
  private boolean IsTweetReplied;
  private long repliesTweetCount;
  private boolean IsTweetRetweeted;
  private long retweetsCount;
  private boolean IsTweetLiked;
  private long likesCount;
  private boolean IsTweetViewed;
  private long viewsCount;
  private boolean IsTweetInBookmark;

  public TweetResponse() {
    setMessage("Your Tweet was sent!");
  }
}
