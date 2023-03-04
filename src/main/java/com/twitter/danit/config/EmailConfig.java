/*
package com.twitter.danit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {
  @Bean
  public JavaMailSender mailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    mailSender.setHost("smtp.gmail.com");
    mailSender.setPort(587);
    mailSender.setUsername("vpodhornyi@gmail.com");
    mailSender.setPassword("ktbygpxbufiatuxy");

    Properties javaMailProperties = new Properties();
    javaMailProperties.put("mail.smtp.auth", true);
    javaMailProperties.put("mail.smtp.starttls.enable", true);

    mailSender.setJavaMailProperties(javaMailProperties);

    return mailSender;
  }
}
*/
