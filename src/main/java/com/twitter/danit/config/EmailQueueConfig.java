package com.twitter.danit.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;

@Configuration
public class EmailQueueConfig {
  public static final String EMAIL_EXCHANGE = "email.exchange";
  public static final String EMAIL_QUEUE = "email.queue";
  public static final String EMAIL_ROUTING_KEY = "email.send";

  @Bean
  public Queue emailQueue() {
    // durable = true, чтобы очередь переживала рестарты
    return QueueBuilder.durable(EMAIL_QUEUE).build();
  }

  @Bean
  public TopicExchange emailExchange() {
    return new TopicExchange(EMAIL_EXCHANGE);
  }

  @Bean
  public Binding emailBinding(Queue emailQueue, TopicExchange emailExchange) {
    return BindingBuilder
        .bind(emailQueue)
        .to(emailExchange)
        .with(EMAIL_ROUTING_KEY);
  }

  // JSON-конвертер для EmailJob
  @Bean
  public MessageConverter emailMessageConverter(ObjectMapper objectMapper) {
    return new Jackson2JsonMessageConverter(objectMapper);
  }

  @Bean
  public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                       MessageConverter emailMessageConverter) {
    RabbitTemplate template = new RabbitTemplate(connectionFactory);
    template.setMessageConverter(emailMessageConverter);
    return template;
  }
}
