package com.twitter.danit.facade.tweet;

import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.dto.tweet.response.bookmark.ClearBookmarksResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClearBookmarksResponseMapper {
  private final ClearBookmarksTweetsResponseMapper clearBookmarksTweetsResponseMapper;
  private final ClearBookmarksResponse dto = new ClearBookmarksResponse();

  public ClearBookmarksResponse convertToDto(List<Tweet> entity) {

    dto.setBookmarks(entity.size() > 0 ? entity.stream()
        .map(clearBookmarksTweetsResponseMapper::convertToDto)
        .toList() : new ArrayList<>());

    return dto;
  }
}
