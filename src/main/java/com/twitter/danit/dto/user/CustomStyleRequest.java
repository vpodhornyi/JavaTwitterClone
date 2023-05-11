package com.twitter.danit.dto.user;

import com.twitter.danit.domain.user.BackgroundColor;
import com.twitter.danit.domain.user.Color;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CustomStyleRequest {
  private Color color;
  private BackgroundColor backgroundColor;
  private int fontSize;
}
