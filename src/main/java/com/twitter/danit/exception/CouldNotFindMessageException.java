package com.twitter.danit.exception;

import com.twitter.danit.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class CouldNotFindMessageException extends AbstractException {
  private final static String MESSAGE = "Sorry, we could not find message!";
  private final static HttpStatus STATUS = HttpStatus.BAD_REQUEST;

  public CouldNotFindMessageException() {
    super(HttpStatus.BAD_REQUEST, CouldNotFindMessageException.MESSAGE);
  }

  public CouldNotFindMessageException(Boolean show) {
    super(CouldNotFindMessageException.STATUS, CouldNotFindMessageException.MESSAGE, show);
  }
}

