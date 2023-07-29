package com.twitter.danit.dao;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.tweet.TweetAction;
import com.twitter.danit.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TweetActionRepository extends JpaRepository<TweetAction, Long> {
  @Query(value = "select TWEET_ID  from TWEET_ACTIONS  where USER_ID =:id and ACTION_TYPE=:type", nativeQuery = true)
  List<Long> findBookmarks(Long id, String type);

  Optional<TweetAction> findFirstByTweetAndUserAndActionType(Tweet tweet, User user, ActionType actionType);

  void deleteAllByUserAndActionType(User user, ActionType actionType);
}
