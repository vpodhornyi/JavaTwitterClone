package com.twitter.danit.exception;

import com.twitter.danit.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class CouldNotGetImagesException extends AbstractException {
  private final static String MESSAGE = "Could not get images, please try later!";
  public CouldNotGetImagesException() {
    super(HttpStatus.BAD_REQUEST, CouldNotGetImagesException.MESSAGE);
  }
}
