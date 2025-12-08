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
  @Value("${WEBSOCKET_PATH}")
  private String path;
  @Value("${RABBITMQ_USER}")
  private String userName;
  @Value("${RABBITMQ_PASSWORD}")
  private String userPassword;
  @Value("${WEBSOCKET_CLIENT_USER}")
  private String clientName;
  @Value("${WEBSOCKET_CLIENT_PASSWORD}")
  private String clientPassword;
  @Value("${RABBITMQ_HOST}")
  private String websocketHost;
  @Value("${WEBSOCKET_PORT}")
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
