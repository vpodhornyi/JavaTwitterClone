package com.twitter.danit.service.email;

import com.twitter.danit.dto.email.EmailJob;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import static com.twitter.danit.config.EmailQueueConfig.EMAIL_QUEUE;

@Service
@RequiredArgsConstructor
public class EmailJobListener {
  private final EmailService emailService;
  private final EmailTemplateService templateService;

  @RabbitListener(queues = EMAIL_QUEUE)
  public void handleEmailJob(EmailJob job) {
    String html = job.getTemplateType().buildHtml(templateService, job);
    emailService.sendHtml(job.getTo(), job.getSubject(), html);
  }
}
