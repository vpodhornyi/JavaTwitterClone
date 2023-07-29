package com.twitter.danit.dto.tweet;

import com.twitter.danit.domain.tweet.TweetType;
import com.twitter.danit.dto.attachment.AttachmentResponse;
import com.twitter.danit.dto.action.TweetActionResponse;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class TweetResponse {
  private Long id;
  private LocalDateTime createdAt;
  private String key;
  private TweetType tweetType;
  private Set<AttachmentResponse> images;
//  private Set<TweetActionResponse> actions;
  private String body;
  private TweetUser user;
  private boolean IsTweetOwner;
  private boolean IsTweetLiked;
  private long likesCount;
  private boolean IsTweetViewed;
  private long viewsCount;
  private boolean IsTweetInBookmark;
}
