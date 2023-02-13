package com.twitter.danit.facade.action;

import com.twitter.danit.domain.tweet.TweetAction;
import com.twitter.danit.dto.action.TweetActionResponseAllData;
import com.twitter.danit.facade.GeneralFacade;
import org.springframework.stereotype.Service;

@Service
public class TweetActionResponseMapper extends GeneralFacade<TweetAction, TweetActionResponseAllData> {
  public TweetActionResponseMapper() {
    super(TweetAction.class, TweetActionResponseAllData.class);
  }


}
