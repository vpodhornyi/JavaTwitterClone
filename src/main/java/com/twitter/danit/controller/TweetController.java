package com.twitter.danit.controller;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.PageAbstract;
import com.twitter.danit.dto.tweet.*;
import com.twitter.danit.dto.tweet.request.QuoteTweetRequest;
import com.twitter.danit.dto.tweet.request.ReplyTweetRequest;
import com.twitter.danit.dto.tweet.request.TweetRequest;
import com.twitter.danit.dto.tweet.response.BookmarkTweetResponse;
import com.twitter.danit.dto.tweet.response.TweetResponse;
import com.twitter.danit.facade.tweet.*;
import com.twitter.danit.facade.tweet.ViewTweetResponseMapper;
import com.twitter.danit.service.TweetService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.version}/tweets")
@AllArgsConstructor
@Slf4j
public class TweetController extends AbstractController {
  private final String topic = "/topic/tweets";
  private final TweetService tweetService;
  private final TweetRequestMapper tweetRequestMapper;
  private final PageTweetResponseMapper pageTweetResponseMapper;
  private final TweetResponseMapper tweetResponseMapper;
  private final RetweetResponseMapper retweetResponseMapper;
  private final LikeTweetResponseMapper likeTweetResponseMapper;
  private final ViewTweetResponseMapper viewTweetResponseMapper;
  private final BookmarkTweetResponseMapper bookmarkTweetResponseMapper;

  @GetMapping
  public ResponseEntity<PageTweetResponse> getAll(
      @RequestParam int pageNumber,
      @RequestParam int pageSize,
      Principal principal) {
    User authUser = getAuthUser(principal);
    Page<Tweet> tweets = tweetService.getTweetsPage(pageNumber, pageSize, authUser.getId());

    return ResponseEntity.ok(pageTweetResponseMapper.convertToDto(tweets, authUser));
  }

  @PostMapping
  public ResponseEntity<TweetResponse> postTweet(@RequestBody TweetRequest tweetRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet savedTweet = tweetService.save(tweetRequestMapper.convertToEntity(tweetRequest, authUser));

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(savedTweet, authUser));
  }

  @GetMapping("/{id}")
  public ResponseEntity<TweetResponse> getTweetById(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(tweet, authUser));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<AbstractResponse> deleteTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);
    tweetService.isUserTweetAuthorException(tweet, authUser);

    return ResponseEntity.ok(tweetService.cascadeRemoveWithResponse(tweet));
  }

  @GetMapping("/{id}/replies")
  public ResponseEntity<PageTweetResponse> getRepliesTweet(
      @PathVariable("id") Long tweetId,
      @RequestParam int pageNumber,
      @RequestParam int pageSize,
      Principal principal) {
    User authUser = getAuthUser(principal);
    Page<Tweet> tweets = tweetService.getTweetRepliesPage(pageNumber, pageSize, tweetId);

    return ResponseEntity.ok(pageTweetResponseMapper.convertToDto(tweets, authUser));
  }

  @PostMapping("/reply-tweet")
  public ResponseEntity<AbstractResponse> postReplyTweet(@RequestBody ReplyTweetRequest tweetRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetRequestMapper.convertToEntity(tweetRequest, authUser);

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(tweetService.save(tweet), authUser));
  }

  @PostMapping("/quote-tweet")
  public ResponseEntity<TweetResponse> postQuoteTweet(@RequestBody QuoteTweetRequest tweetRequest, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetRequestMapper.convertToEntity(tweetRequest, authUser);
    Tweet savedTweet = tweetService.saveTweetAndUpdateParentTweet(authUser, tweet, ActionType.QUOTE_TWEET);

    return ResponseEntity.ok(tweetResponseMapper.convertToDto(savedTweet, authUser));
  }

  @GetMapping("/bookmarks")
  public ResponseEntity<PageAbstract<TweetResponse>> getBookmarks(@RequestParam int pageNumber, @RequestParam int pageSize, Principal principal) {
    User authUser = getAuthUser(principal);
    Page<Tweet> tweets = tweetService.getBookmarkTweetsPage(pageNumber, pageSize, authUser.getId());

    return ResponseEntity.ok(pageTweetResponseMapper.convertToDto(tweets, authUser));
  }

  @PostMapping("/{id}/like")
  public ResponseEntity<AbstractResponse> likeTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.LIKE);
    AbstractResponse likeTweetResponse = likeTweetResponseMapper.convertToDto(savedTweet, authUser);
    sendStompMessage(topic, likeTweetResponse);

    return ResponseEntity.ok(likeTweetResponse);
  }

  @PostMapping("/{id}/view")
  public ResponseEntity<AbstractResponse> viewTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);
    tweetService.isUserNoTweetAuthorException(tweet, authUser);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.VIEW);
    AbstractResponse viewTweetResponse = viewTweetResponseMapper.convertToDto(savedTweet, authUser);
    sendStompMessage(topic, viewTweetResponse);

    return ResponseEntity.ok(viewTweetResponse);
  }

  @PostMapping("/{id}/bookmark")
  public ResponseEntity<AbstractResponse> bookmarkTweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.BOOKMARK);
    AbstractResponse bookmarkTweetResponse = bookmarkTweetResponseMapper.convertToDto(savedTweet, authUser);
    sendStompMessage(topic, bookmarkTweetResponse);

    return ResponseEntity.ok(bookmarkTweetResponse);
  }

  @PostMapping("/clear-bookmarks")
  public ResponseEntity<ClearBookmarksResponse> clearAllUserBookmarks(Principal principal) {
    User authUser = getAuthUser(principal);
    tweetService.deleteAllUserBookmarks(authUser);

    return ResponseEntity.ok(new ClearBookmarksResponse());
  }

  @PostMapping("/{id}/retweet")
  public ResponseEntity<AbstractResponse> retweet(@PathVariable("id") Long tweetId, Principal principal) {
    User authUser = getAuthUser(principal);
    Tweet tweet = tweetService.findById(tweetId);
    Tweet savedTweet = tweetService.addOrRemoveTweetAction(tweet, authUser, ActionType.RETWEET);
    AbstractResponse retweetResponse = retweetResponseMapper.convertToDto(savedTweet, authUser);
    sendStompMessage(topic, retweetResponse);

    return ResponseEntity.ok(retweetResponse);
  }
}
