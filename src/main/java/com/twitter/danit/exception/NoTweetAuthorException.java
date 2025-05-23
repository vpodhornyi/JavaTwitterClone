package com.twitter.danit.exception;

import org.springframework.http.HttpStatus;

public class NoTweetAuthorException extends AbstractException {
  private static final String MESSAGE = "Could not delete tweet. You are not tweet's author!";
  private static final HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public NoTweetAuthorException() {
    super(NoTweetAuthorException.STATUS, NoTweetAuthorException.MESSAGE);
  }
}
