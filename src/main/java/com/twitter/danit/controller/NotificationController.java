package com.twitter.danit.controller;


import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.dto.PageAbstract;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/notifications")
public class NotificationController extends AbstractController {

  public ResponseEntity<PageAbstract<Notification>> findAll() {

    return ResponseEntity.ok(null);
  }
}
