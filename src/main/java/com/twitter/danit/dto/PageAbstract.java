package com.twitter.danit.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public abstract class PageAbstract<T> {
  private int totalPages;
  private long totalElements;
  private List<T> elements = new ArrayList<>();

  public void addElement(T chat) {
    elements.add(chat);
  }
}
