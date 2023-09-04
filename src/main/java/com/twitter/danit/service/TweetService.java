package com.twitter.danit.service;

import com.twitter.danit.dao.TweetActionRepository;
import com.twitter.danit.dao.TweetRepository;
import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.tweet.TweetAction;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.AbstractResponse;
import com.twitter.danit.dto.tweet.response.bookmark.ClearBookmarksTweetsResponse;
import com.twitter.danit.dto.tweet.response.DeleteTweetResponse;
import com.twitter.danit.exception.CouldNotFindTweetException;
import com.twitter.danit.exception.NoTweetAuthorException;
import com.twitter.danit.exception.TweetViewException;
import com.twitter.danit.facade.tweet.ClearBookmarksTweetsResponseMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class TweetService {
  private final TweetRepository tweetRepository;
  private final TweetActionRepository tweetActionRepository;
  private final ClearBookmarksTweetsResponseMapper clearBookmarksTweetsResponseMapper;

  public Page<Tweet> getTweetsPage(int pageNumber, int pageSize, Long userId) {
    return tweetRepository.findAllTweetsWithTypeTweet(userId, PageRequest.of(pageNumber, pageSize)).orElse(Page.empty());
  }

  public Page<Tweet> getTweetRepliesPage(int pageNumber, int pageSize, Long tweetId) {
    return tweetRepository.findTweetReplies(tweetId, PageRequest.of(pageNumber, pageSize)).orElse(Page.empty());
  }

  public Page<Tweet> getBookmarkTweetsPage(int pageNumber, int pageSize, Long userId) {
    return tweetRepository.findActionsTweets(userId, ActionType.BOOKMARK.toString(), PageRequest.of(pageNumber, pageSize)).orElse(Page.empty());
  }

  @Transactional
  public Tweet save(Tweet tweet) {
    return tweetRepository.save(tweet);
  }

  @Transactional
  public Tweet saveTweetAndUpdateParentTweet(User user, Tweet tweet, ActionType actionType) {
    Tweet parentTweet = tweet.getParentTweet();
    parentTweet.addTweetAction(actionType, user);
    save(parentTweet);

    return save(tweet);
  }

  public Tweet findById(Long tweetId) {
    Optional<Tweet> optionalTweet = tweetRepository.findById(tweetId);

    if (optionalTweet.isPresent()) {
      return optionalTweet.get();
    }

    throw new CouldNotFindTweetException();
  }

  public void deleteById(Long tweetId) {
    tweetRepository.deleteById(tweetId);
  }

  public AbstractResponse deleteByIdWithResponse(Long tweetId) {
    tweetRepository.deleteById(tweetId);

    return new DeleteTweetResponse(tweetId);
  }

  @Transactional
  public void cascadeRemoveChildren(Tweet tweet) {
    List<Tweet> children = tweet.getChildren();
    for (Tweet child : children) {
      cascadeRemoveChildren(child);
    }
    tweetRepository.delete(tweet);
  }

  public AbstractResponse cascadeRemoveWithResponse(Tweet tweet) {
    cascadeRemoveChildren(tweet);

    return new DeleteTweetResponse(tweet.getId());
  }

  public void isUserTweetAuthorException(Tweet tweet, User user) {
    if (!Objects.equals(tweet.getUser(), user)) throw new NoTweetAuthorException();
  }

  public void isUserNoTweetAuthorException(Tweet tweet, User user) {
    boolean showErrorMessage = false;
    if (Objects.equals(tweet.getUser(), user)) throw new TweetViewException(showErrorMessage);
  }

  public Tweet addOrRemoveTweetAction(Tweet tweet, User user, ActionType actionType) {
    Optional<TweetAction> optionalTweetAction = tweetActionRepository.findFirstByTweetAndUserAndActionType(tweet, user, actionType);

    if (optionalTweetAction.isEmpty()) tweet.addTweetAction(actionType, user);
    else tweet.deleteTweetAction(optionalTweetAction.get());

    return save(tweet);
  }

  public List<ClearBookmarksTweetsResponse> deleteAllUserBookmarks(User user) {
    Optional<List<Tweet>> optionalTweets = tweetRepository.findAllTweetsByUserAndActionType(user.getId(), ActionType.BOOKMARK.toString());

    if (optionalTweets.isPresent()) {
      List<Tweet> tweets = optionalTweets.get();

      if (tweets.size() != 0) {
        tweetActionRepository.deleteAllByUserAndActionType(user, ActionType.BOOKMARK);
        List<Long> list = tweets.stream().map(Tweet::getId).toList();
        Optional<List<Tweet>> optionalTweetList = tweetRepository.findAllByIdIn(list);

        if (optionalTweetList.isPresent()) {
          return optionalTweetList.get().stream()
              .map(clearBookmarksTweetsResponseMapper::convertToDto)
              .toList();
        }
      }
    }
    return new ArrayList<>();
  }
}
