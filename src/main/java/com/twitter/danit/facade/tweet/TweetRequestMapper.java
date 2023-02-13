package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.attachment.AttachmentImage;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.dto.tweet.TweetRequest;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TweetRequestMapper extends GeneralFacade<Tweet, TweetRequest> {
  public TweetRequestMapper() {
    super(Tweet.class, TweetRequest.class);
  }

  @Override
  public void decorateEntity(Tweet entity, TweetRequest dto) {
    Set<AttachmentImage> newAttachment =
            dto.getImages().stream().map(el -> new AttachmentImage(el, entity)).collect(Collectors.toSet());
    entity.setImages(newAttachment);
  }
}
