package com.twitter.danit.exception;

import org.springframework.http.HttpStatus;

public class TweetViewException extends AbstractException {
  private static final String MESSAGE = "You are tweet author! You can't save tweet-view!";
  private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public TweetViewException(Boolean show) {
    super(TweetViewException.STATUS, TweetViewException.MESSAGE, show);
  }
}
