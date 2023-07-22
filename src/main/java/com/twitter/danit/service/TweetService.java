package com.twitter.danit.service;

import com.twitter.danit.dao.TweetActionRepository;
import com.twitter.danit.dao.TweetRepository;
import com.twitter.danit.dao.UserDao;
import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.tweet.TweetAction;
import com.twitter.danit.domain.user.User;
import com.twitter.danit.dto.action.TweetActionRequest;
import com.twitter.danit.dto.action.TweetActionResponseAllData;
import com.twitter.danit.dto.tweet.TweetRequest;
import com.twitter.danit.exception.CouldNotFindTweetException;
import com.twitter.danit.exception.NoTweetAuthorException;
import com.twitter.danit.facade.action.TweetActionResponseMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class TweetService {
  private final TweetRepository tweetRepository;
  private final TweetActionRepository tweetActionRepository;
  private final TweetActionResponseMapper tweetActionResponseMapper;
  private final UserDao userDao;

  public Page<Tweet> getTweetsPage(int pageNumber, int pageSize, Long userId) {
    return tweetRepository.findAllTweets(userId, PageRequest.of(pageNumber, pageSize)).orElse(Page.empty());
  }

  @Transactional
  public Tweet save(Tweet tweet) {
    return tweetRepository.save(tweet);
  }

  public List<Long> getBookmarks() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = principal instanceof UserDetails
        ? ((UserDetails) principal).getUsername()
        : principal.toString();
    User user = userDao.findByUserTag(username);
    return tweetActionRepository.findBookmarks(user.getId(), "BOOKMARK");
  }

  public void update(TweetRequest tweetUpdate) {
//    System.out.println(tweetUpdate.getId());
//    Tweet tweet = tweetRepository.findById(tweetUpdate.getId()).get();
//    tweet.setTweetType(tweetUpdate.getTweetType());
//    tweet.setBody(tweetUpdate.getBody());
//    tweet.setUser(tweetUpdate.getUser());

//    tweetRepository.save(tweet);
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

  public void isUserTweetAuthorException(Tweet tweet, User user) {
    if (!Objects.equals(tweet.getUser(), user)) throw new NoTweetAuthorException();
  }

  public TweetActionResponseAllData changeAction(TweetActionRequest tweetActionRequest) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = principal instanceof UserDetails
        ? ((UserDetails) principal).getUsername()
        : principal.toString();

    Tweet tweet = tweetRepository.findById(tweetActionRequest.getTweetId()).orElse(new Tweet());
    User user = userDao.findByUserTag(username);
    TweetAction newTweetAction = new TweetAction(tweetActionRequest.getActionType(), tweet, user);

    TweetAction resultFilter =
        tweet.getActions().stream()
            .filter(action -> action.getActionType().equals(tweetActionRequest.getActionType())
                && action.getUser().getUserTag().equals(username)
            ).findFirst().orElse(newTweetAction);

    if (!resultFilter.equals(newTweetAction)) {
      tweetActionRepository.deleteById(resultFilter.getId());
    } else {
      tweetActionRepository.save(newTweetAction);
    }
    return tweetActionResponseMapper.convertToDto(newTweetAction);
  }

  public Tweet likeTweet(Long tweetId, User user) {
    Tweet tweet = findById(tweetId);
    Optional<TweetAction> optionalTweetAction = findTweetAction(tweet, user, ActionType.LIKE);

    if (optionalTweetAction.isEmpty()) tweet.addTweetAction(ActionType.LIKE, user);
    else tweet.deleteTweetAction(optionalTweetAction.get());

    return save(tweet);
  }

  private Optional<TweetAction> findTweetAction(Tweet tweet, User user, ActionType actionType) {
    return tweetActionRepository.findFirstByTweetAndUserAndActionType(tweet, user, actionType);
  }
}
