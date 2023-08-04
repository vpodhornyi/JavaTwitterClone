package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.request.AbstractTweetRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.TweetService;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, AbstractTweetRequest> {
  private final TweetService tweetService;

  public TweetRequestMapper(TweetService tweetService) {
    super(Tweet.class, AbstractTweetRequest.class);
    this.tweetService = tweetService;
  }

  @Override
  public void decorateEntity(Tweet entity, AbstractTweetRequest dto, User user) {
    Long parentId = dto.getParentTweetId();

    if (parentId != null) {
      Tweet parentTweet = tweetService.findById(parentId);
      entity.setParentTweet(parentTweet);
    }

    Set<AttachmentImage> newAttachment = dto.getImages().stream()
        .map(imgUrl -> new AttachmentImage(imgUrl, entity))
        .collect(Collectors.toSet());
    entity.setImages(newAttachment);
    entity.setUser(user);
    entity.setCreatedBy(user.getEmail());
    entity.setUpdatedBy(user.getEmail());
  }
}
