package com.twitter.danit.dao;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import com.twitter.danit.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

  @Query(value = """
      select * from tweets t
      where t.tweet_type = 'TWEET'
      order by t.created_at desc
      """,
      nativeQuery = true)
  Optional<Page<Tweet>> findAllTweetsWithTypeTweet(@Param("userId") Long userId, Pageable pageable);

  @Query(value = """
      select * from tweets t
      where t.tweet_type = 'REPLY_TWEET'
      and t.parent_tweet_id = :tweetId
      order by t.created_at desc
      """,
      nativeQuery = true)
  Optional<Page<Tweet>> findTweetReplies(@Param("tweetId") Long tweetId, Pageable pageable);

  @Query(value = """
      select * from tweets t
      join tweet_actions ta on t.id = ta.tweet_id
      where ta.user_id = :userId and ta.action_type = :actionType
      order by ta.created_at desc
      """,
      nativeQuery = true)
  Optional<Page<Tweet>> findActionsTweets(
      @Param("userId") Long userId,
      @Param("actionType") String actionType,
      Pageable pageable);

  @Query(value = """
      select * from tweets t
      join tweet_actions ta on t.id = ta.tweet_id
      where ta.user_id = :userId and ta.action_type = :actionType
      order by ta.created_at desc
            """,
      nativeQuery = true)
  Optional<List<Tweet>> findAllTweetsByUserAndActionType(@Param("userId") Long userId, @Param("actionType") String actionType);

  Optional<List<Tweet>> findAllByIdIn(List<Long> ids);
}
