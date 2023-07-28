package com.twitter.danit.dao;

import com.twitter.danit.domain.tweet.ActionType;
import com.twitter.danit.domain.tweet.Tweet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

  @Query(value = """
      select * from tweets t order by t.created_at desc
      """,
      nativeQuery = true)
  Optional<Page<Tweet>> findAllTweets(@Param("userId") Long userId, Pageable pageable);

  @Query(value = """
      select * from tweets t
      join tweet_actions ta on t.id = ta.tweet_id
      where ta.user_id = :userId and ta.action_type = :actionType
      order by t.created_at desc
      """,
      nativeQuery = true)
  Optional<Page<Tweet>> findActionsTweets(
      @Param("userId") Long userId,
      @Param("actionType") String actionType,
      Pageable pageable);
}
