package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.PageTweetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PageTweetResponseMapper {
  private final TweetResponseMapper tweetResponseMapper;

  public PageTweetResponse convertToDto(Page<Tweet> entity, User authUser) {
    PageTweetResponse dto = new PageTweetResponse();
    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Tweet> tweets = entity.getContent();

    if (tweets.size() > 0) {
      dto.setElements(tweets.stream().map(t -> tweetResponseMapper.convertToDto(t, authUser)).toList());
    }

    return dto;
  }
}
