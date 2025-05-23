package com.twitter.danit.exception;

import com.twitter.danit.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class WrongPasswordException extends AbstractException {
  private  static final String MESSAGE = "Wrong password!";

  public WrongPasswordException() {
    super(HttpStatus.BAD_REQUEST, WrongPasswordException.MESSAGE);
  }
}
