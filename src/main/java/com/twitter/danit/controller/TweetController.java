package com.twitter.danit.controller;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.tweet.DeleteTweetResponse;
import com.twitter.danit.dto.tweet.PageTweetResponse;
import com.twitter.danit.dto.tweet.TweetRequest;
import com.twitter.danit.dto.tweet.TweetResponse;
import com.twitter.danit.dto.action.TweetActionRequest;
import com.twitter.danit.dto.action.TweetActionResponseAllData;
import com.twitter.danit.facade.tweet.PageTweetResponseMapper;
import com.twitter.danit.facade.tweet.TweetRequestMapper;
import com.twitter.danit.facade.tweet.TweetResponseMapper;
import com.twitter.danit.service.TweetService;
import com.twitter.danit.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  private final UserService userService;
  private final TweetService tweetService;
  private final TweetRequestMapper tweetRequestMapper;
  private final PageTweetResponseMapper pageTweetResponseMapper;
  private final TweetResponseMapper tweetResponseMapper;

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
    return ResponseEntity.ok(tweetResponseMapper.convertToDto(savedTweet));
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
  public ResponseEntity<DeleteTweetResponse> deleteTweet(@PathVariable("id") Long tweetId, Principal principal) throws Exception {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    Tweet tweet = tweetService.findById(tweetId);
    System.out.println(tweet);
    tweetService.isUserTweetAuthorException(tweet, authUser);
    tweetService.deleteById(tweetId);
    return ResponseEntity.ok(new DeleteTweetResponse(tweetId));
  }

  @PutMapping("/update")
  public void update(@Valid @RequestBody TweetRequest dto) {
    tweetService.update(dto);
  }

  @PostMapping("/create")
  public TweetResponse create(@RequestBody TweetRequest dto) {
    Tweet tweet = tweetRequestMapper.convertToEntity(dto);
    return tweetResponseMapper.convertToDto(tweetService.save(tweet));
  }

  @PostMapping("/actions")
  public TweetActionResponseAllData changeAction(@RequestBody TweetActionRequest tweetActionRequest, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());
    System.out.println(tweetActionRequest);
    return null;
  }

  @PostMapping("/{id}/like")
  public ResponseEntity<TweetResponse> likeTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = userService.findByUserTagTrowException(principal.getName());

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(tweetService.likeTweet(tweetId, authUser)));
  }
}
