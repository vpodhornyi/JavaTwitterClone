package com.twitter.danit.dto.tweet.response.bookmark;

import com.twitter.danit.dto.DtoResponseType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClearBookmarksResponse {
  private final DtoResponseType type = DtoResponseType.UPDATE_BOOKMARKS_COUNT;
  List<ClearBookmarksTweetsResponse> bookmarks;
}
