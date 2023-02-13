package com.twitter.danit.service;

import com.twitter.danit.dao.FollowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowerService {
  private final FollowerRepository followerRepository;

  
}
