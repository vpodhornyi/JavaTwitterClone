package com.twitter.danit.service.email;

public interface EmailService {
  String sendSimpleMail(EmailDetails details);
  String sendMailWithAttachment(EmailDetails details);
}
