package com.twitter.danit.dao;

import com.twitter.danit.domain.user.CustomStyle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomStyleRepository extends JpaRepository<CustomStyle, Long> {
}
