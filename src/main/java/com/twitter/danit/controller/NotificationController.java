package com.twitter.danit.controller;


import com.twitter.danit.domain.notification.NotificationType;
import com.twitter.danit.dto.notification.NotificationReadRequest;
import com.twitter.danit.dto.notification.PageNotificationResponse;
import com.twitter.danit.facade.notification.PageNotificationResponseMapper;
import org.springframework.data.domain.Page;
import com.twitter.danit.domain.notification.Notification;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("${api.version}/notifications")
public class NotificationController extends AbstractController {
  private final NotificationService notificationService;
  private final PageNotificationResponseMapper pageNotificationResponseMapper;


  @GetMapping("/types")
  public ResponseEntity<NotificationType[]> getNotificationsTypes() {
    return ResponseEntity.ok(NotificationType.values());
  }

  @GetMapping
  public ResponseEntity<PageNotificationResponse> findAll(@RequestParam int pageNumber,
                                                           @RequestParam int pageSize,
                                                           Principal principal) {
    User authUser = getAuthUser(principal);
    Page<Notification> notReadTweetsPage = notificationService.getNotReadTweetsPage(pageNumber, pageSize, authUser);
    return ResponseEntity.ok(pageNotificationResponseMapper.convertToDto(notReadTweetsPage));
  }

  @PutMapping("/mark-read")
  public ResponseEntity<Void> markAsRead(@RequestBody List<Long> ids, Principal principal) {
    User authUser = getAuthUser(principal);
    notificationService.markAsReadByIds(ids, authUser);
    return ResponseEntity.ok().build();
  }
}
