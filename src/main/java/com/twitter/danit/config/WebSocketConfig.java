package com.twitter.danit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Value("${spring.rabbitmq.path}")
  private String path;
  @Value("${spring.rabbitmq.username}")
  private String userName;
  @Value("${spring.rabbitmq.password}")
  private String userPassword;
  @Value("${spring.rabbitmq.clientname}")
  private String clientName;
  @Value("${spring.rabbitmq.clientpassword}")
  private String clientPassword;
  @Value("${spring.rabbitmq.host}")
  private String websocketHost;
  @Value("${spring.rabbitmq.port}")
  private int websocketPort;

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint(path)
        .setAllowedOriginPatterns("*");
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config
        .setApplicationDestinationPrefixes("/app")
        .enableStompBrokerRelay("/topic", "/queue")
        .setSystemLogin(userName)
        .setSystemPasscode(userPassword)
        .setClientLogin(clientName)
        .setClientPasscode(clientPassword)
        .setRelayHost(websocketHost)
        .setRelayPort(websocketPort);
  }
}
