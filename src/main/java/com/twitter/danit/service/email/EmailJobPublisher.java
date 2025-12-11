package com.twitter.danit.service.email;

import com.twitter.danit.config.EmailQueueConfig;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.email.EmailJob;
import com.twitter.danit.dto.email.EmailTemplateType;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailJobPublisher {
  private final RabbitTemplate rabbitTemplate;

  public void publish(EmailJob job) {
    rabbitTemplate.convertAndSend(
        EmailQueueConfig.EMAIL_EXCHANGE,
        EmailQueueConfig.EMAIL_ROUTING_KEY,
        job
    );
  }

  public void publishWelcomeEmail(User user, String password) {
    EmailJob job = new EmailJob();
    job.setTo(user.getEmail());
    job.setSubject("Welcome to TwitterClone");
    job.setTemplateType(EmailTemplateType.WELCOME);
    job.setUsername(user.getName());
    job.setPassword(password);

    publish(job);
  }

  public void publishNewPasswordEmail(User user, String password) {
    EmailJob job = new EmailJob();
    job.setTo(user.getEmail());
    job.setSubject("Your new password");
    job.setTemplateType(EmailTemplateType.NEW_PASSWORD);
    job.setUsername(user.getName());
    job.setPassword(password);

    publish(job);
  }
}
