package com.twitter.danit.dao;

import com.twitter.danit.domain.auth.RefreshJwtStore;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshJwtStoreDao extends CrudRepository<RefreshJwtStore, Integer> {
  Optional<RefreshJwtStore> findFirstByLoginOrderByIdDesc(String login);
  void deleteAllByLogin(String login);
}
