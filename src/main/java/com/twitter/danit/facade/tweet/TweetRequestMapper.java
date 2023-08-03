package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.TweetRequest;
import com.twitter.danit.facade.GeneralFacade;
import com.twitter.danit.service.TweetService;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, TweetRequest> {
  private final TweetService tweetService;

  public TweetRequestMapper(TweetService tweetService) {
    super(Tweet.class, TweetRequest.class);
    this.tweetService = tweetService;
  }

  @Override
  public void decorateEntity(Tweet entity, TweetRequest dto, User user) {
    Tweet parentTweet = tweetService.findById(dto.getParentTweetId());

    entity.setParentTweet(parentTweet);
    Set<AttachmentImage> newAttachment = dto.getImages().stream()
        .map(imgUrl -> new AttachmentImage(imgUrl, entity))
        .collect(Collectors.toSet());
    entity.setImages(newAttachment);
    entity.setUser(user);
    entity.setCreatedBy(user.getEmail());
  }
}
