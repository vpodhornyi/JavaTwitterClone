package com.twitter.danit.service.email;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class EmailDetails implements Serializable {
  private List<String> to;
  private String from;
  private String subject;
  private String html;


  public EmailDetails(List<String> to, String from, String subject, String html) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.html = html;
  }
}
