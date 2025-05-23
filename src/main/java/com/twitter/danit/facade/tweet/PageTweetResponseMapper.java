package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.PageTweetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PageTweetResponseMapper {
  private final TweetResponseMapper tweetResponseMapper;
  PageTweetResponse dto = new PageTweetResponse();

  public PageTweetResponse convertToDto(Page<Tweet> entity, User authUser) {

    dto.setTotalPages(entity.getTotalPages());
    dto.setTotalElements(entity.getTotalElements());

    List<Tweet> tweets = entity.getContent();

    dto.setElements(tweets.size() > 0 ? tweets.stream().map(t -> tweetResponseMapper.convertToDto(t, authUser)).toList() :
        new ArrayList<>());

    return dto;
  }
}
