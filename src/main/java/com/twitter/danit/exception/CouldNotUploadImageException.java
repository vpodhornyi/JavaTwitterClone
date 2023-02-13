package com.twitter.danit.exception;

import org.springframework.http.HttpStatus;

public class CouldNotUploadImageException extends AbstractException {
  private final static String MESSAGE = "Could not save image, please try later!";

  public CouldNotUploadImageException() {
    super(HttpStatus.BAD_REQUEST, CouldNotUploadImageException.MESSAGE);
  }
}
