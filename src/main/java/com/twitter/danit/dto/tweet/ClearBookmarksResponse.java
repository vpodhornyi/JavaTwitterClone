package com.twitter.danit.dto.tweet;

import lombok.Getter;

@Getter
public class ClearBookmarksResponse {
  boolean show = true;
  private final String message = "All your bookmarks have been successfully deleted!";
}
