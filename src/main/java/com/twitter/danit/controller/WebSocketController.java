package com.twitter.danit.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("${api.version}//send")
  @SendTo("/topic/messages")
  public String sendMessage(String message) {
    // This method handles incoming messages and broadcasts them to all connected users.
    return message;
  }
}
