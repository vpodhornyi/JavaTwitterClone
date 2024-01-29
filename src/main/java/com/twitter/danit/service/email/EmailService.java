package com.twitter.danit.service.email;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twitter.danit.utils.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.twitter.danit.domain.user.User;

import java.util.ArrayList;
import java.util.List;


@Service
public class EmailService {
  @Autowired
  private JavaMailSender emailSender;

  private final RestTemplate restTemplate = new RestTemplate();

  public void sendSimpleMessage() {
    SimpleMailMessage message = new SimpleMailMessage();
    String text = """
      <html>
      <body>
      <h3>Hi welcome to the Chipping Sodbury On-the-Hill message boards!</h3>
            
      <div>
         Your email address is <a href="/home">link</a>.
      </div>
      </body>
            
      </html>
      """;
    message.setFrom("vpodhornyi@gamial.com");
    message.setTo("wxs@ukr.net");
    message.setSubject("kuku");
    message.setText(text);
    emailSender.send(message);
  }

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
