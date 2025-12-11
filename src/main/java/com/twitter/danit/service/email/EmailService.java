package com.twitter.danit.service.email;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.twitter.danit.domain.user.User;

import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EmailService {

  @Value("${app.mail.from}")
  private String from;
  private final JavaMailSender mailSender;
  private final EmailTemplateService templateService;

  private final RestTemplate restTemplate = new RestTemplate();

  public void sendHtml(String to, String subject, String html) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

      helper.setFrom(from);
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(html, true);

      mailSender.send(message);
    } catch (Exception e) {
      e.printStackTrace(); // можно убрать после отладки
      throw new RuntimeException("Failed to send email", e);
    }
  }

/*  public void sendWelcome(User user, String password) {
    String html = templateService.buildWelcomeTemplate(user, password);
    sendHtml(user.getEmail(), "Welcome to TwitterClone", html);
  }

  public void sendNewPassword(User user, String password) {
    String html = templateService.buildNewPasswordTemplate(user, password);
    sendHtml(user.getEmail(), "Your new password", html);
  }*/

  public void sendByNodeMailer(User user, String password) throws JsonProcessingException {
    String url = "http://localhost:8081/send";
    ObjectMapper mapper = new ObjectMapper();
    List<String> emails = new ArrayList<>();
    emails.add(user.getEmail());
    String from = "No reply email <noreply@fake.com>";
    String subject = "Welcome message";
    String html = Email.getWelcomeHtml(password, user);
    EmailDetails emailDetails = new EmailDetails(emails, from, subject, html);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> requestEntity = new HttpEntity<>(mapper.writeValueAsString(emailDetails), headers);
    restTemplate.postForEntity(url, requestEntity, String.class);
  }
}
