package com.twitter.danit.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CustomStyleResponse {
  private String color;
  private String background;
  private int fontSize;
}
