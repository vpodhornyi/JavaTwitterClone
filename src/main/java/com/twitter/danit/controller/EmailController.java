package com.twitter.danit.controller;

import com.twitter.danit.service.email.EmailDetails;
import com.twitter.danit.service.email.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
  @Autowired
  private EmailServiceImpl emailService;

  // Sending a simple Email
  @PostMapping("/sendMail")
  public String
  sendMail(@RequestBody EmailDetails details) {
    return emailService.sendSimpleMail(details);
  }

  // Sending email with attachment
  @PostMapping("/sendMailWithAttachment")
  public String sendMailWithAttachment(@RequestBody EmailDetails details) {
    return emailService.sendMailWithAttachment(details);
  }
}
