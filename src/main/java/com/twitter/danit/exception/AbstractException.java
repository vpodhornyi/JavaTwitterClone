package com.twitter.danit.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
@Setter
public abstract class AbstractException extends ResponseStatusException {
  protected String message;
  protected Boolean showMessage = true;

  public AbstractException(HttpStatus status, String message) {
    super(status, message);
    this.message = message;
  }

  public AbstractException(HttpStatus status, String message, Boolean show) {
    super(status, message);
    this.message = message;
    this.showMessage = show;
  }
}
