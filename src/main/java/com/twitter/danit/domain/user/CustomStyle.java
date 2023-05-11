package com.twitter.danit.domain.user;

import com.twitter.danit.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name= "custom_style")
@Getter
@Setter
@AllArgsConstructor
public class CustomStyle extends BaseEntity {
  private Color color;
  private BackgroundColor backgroundColor;
  private int fontSize;

  public CustomStyle() {
    this.color = Color.BLUE;
    this.backgroundColor = BackgroundColor.DEFAULT;
    this.fontSize = 14;
  }
}
