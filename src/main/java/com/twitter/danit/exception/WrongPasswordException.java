package com.twitter.danit.exception;

import org.springframework.http.HttpStatus;

public class WrongPasswordException extends AbstractException {
  public WrongPasswordException() {
    super(HttpStatus.BAD_REQUEST, "Wrong password!");
  }
}
