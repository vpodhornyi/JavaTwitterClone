package com.twitter.danit.controller;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.*;
import com.twitter.danit.dto.action.TweetActionRequest;
import com.twitter.danit.dto.action.TweetActionResponseAllData;
import com.twitter.danit.facade.tweet.*;
import com.twitter.danit.service.TweetService;
import com.twitter.danit.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.version}/tweets")
@RequiredArgsConstructor
@Slf4j
public class TweetController {
  private final String queue = "/queue/tweets";
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final UserService userService;
  private final TweetService tweetService;
  private final TweetRequestMapper tweetRequestMapper;
  private final PageTweetResponseMapper pageTweetResponseMapper;
  private final TweetResponseMapper tweetResponseMapper;
  private final LikeTweetResponseMapper likeTweetResponseMapper;
  private final ViewTweetResponseMapper viewTweetResponseMapper;
  private final BookmarkTweetResponseMapper bookmarkTweetResponseMapper;

  @GetMapping
  public ResponseEntity<PageTweetResponse> getAll(@RequestParam int pageNumber, @RequestParam int pageSize, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Page<Tweet> tweets = tweetService.getTweetsPage(pageNumber, pageSize, authUser.getId());

    return ResponseEntity.ok(pageTweetResponseMapper.convertToDto(tweets, authUser));
  }

  @PostMapping
  public ResponseEntity<TweetResponse> postTweet(@RequestBody TweetRequest tweetRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Tweet savedTweet = tweetService.save(tweetRequestMapper.convertToEntity(tweetRequest, authUser));
    return ResponseEntity.ok(tweetResponseMapper.convertToDto(savedTweet, authUser));
  }

  @GetMapping("/bookmarks")
  public List<Long> getBookmarks() {
    return tweetService.getBookmarks();
  }

  @GetMapping("/{id}")
  public TweetResponse getById(@PathVariable("id") String userId, Principal principal) throws Exception {
    Tweet tweet = tweetService.findById(Long.parseLong(userId));
    if (tweet.equals(new Tweet())) {
      throw new NullPointerException("There is no tweet with this id");
    }
    return tweetResponseMapper.convertToDto(tweet);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<DeleteTweetResponse> deleteTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Tweet tweet = tweetService.findById(tweetId);
    tweetService.isUserTweetAuthorException(tweet, authUser);
    tweetService.deleteById(tweetId);

    return ResponseEntity.ok(new DeleteTweetResponse(tweetId));
  }

  @PostMapping("/create")
  public ResponseEntity<TweetResponse> create(@RequestBody TweetRequest dto) {
    Tweet tweet = tweetRequestMapper.convertToEntity(dto);
    return ResponseEntity.ok(tweetResponseMapper.convertToDto(tweetService.save(tweet)));
  }

  @PostMapping("/{id}/like")
  public ResponseEntity<LikeTweetResponse> likeTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    System.out.println(authUser.getId());
    Tweet tweet = tweetService.findById(tweetId);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.LIKE);
    LikeTweetResponse likeTweetResponse = likeTweetResponseMapper.convertToDto(savedTweet, authUser);
    simpMessagingTemplate.convertAndSend(queue, ResponseEntity.ok(likeTweetResponse));

    return ResponseEntity.ok(likeTweetResponse);
  }

  @PostMapping("/{id}/view")
  public ResponseEntity<ViewTweetResponse> viewTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Tweet tweet = tweetService.findById(tweetId);
    tweetService.isUserNoTweetAuthorException(tweet, authUser);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.VIEW);

    return ResponseEntity.ok(viewTweetResponseMapper.convertToDto(savedTweet, authUser));
  }

  @GetMapping("/bookmark")
  public ResponseEntity<BookmarkTweetResponse> bookmarkTweet(Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());

    return ResponseEntity.ok(null);
  }

  @PostMapping("/{id}/retweet")
  public ResponseEntity<TweetResponse> retweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Tweet tweet = tweetService.findById(tweetId);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.RETWEET);

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(savedTweet, authUser));
  }
}
