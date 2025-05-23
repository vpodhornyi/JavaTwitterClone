package com.twitter.danit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractResponse {
  private Long id;
  private String message;
  boolean showMessage = true;
}
