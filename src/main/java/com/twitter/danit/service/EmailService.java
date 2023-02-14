package com.twitter.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender emailSender;

  public void sendSimpleMessage() {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("vpodhornyi@gamial.com");
    message.setTo("wxs@ukr.net");
    message.setSubject("kuku");
    message.setText("kuku text");
    emailSender.send(message);
  }
}
