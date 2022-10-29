package com.twitter.danit.dao;

import com.twitter.danit.domain.auth.RefreshJwtStore;
import org.springframework.data.repository.CrudRepository;

public interface RefreshJwtStoreDao extends CrudRepository<RefreshJwtStore, Integer> {
}
