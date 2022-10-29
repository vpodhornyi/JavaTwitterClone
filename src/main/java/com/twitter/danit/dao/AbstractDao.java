package com.twitter.danit.dao;

import java.util.List;
import java.util.Optional;

public interface AbstractDao<T> {
  List<T> findAll();

  Optional<T> get(Long id);

  void create(T employee);

  void update(T employee);

  void delete(T employee);
}
