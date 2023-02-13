package com.twitter.danit.dao;

import com.twitter.danit.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
  User findByUserTag(String userTag);

  User findByEmail(String email);
}
