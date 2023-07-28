import React, {lazy, Suspense, useEffect} from "react";

import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from '../../components';
import Loading from "../../components/Loader/Loading";
import TwitForma from "./components/twitForm/TwitForma";
import HomeHeader from "./Header";
import {useDispatch, useSelector} from "react-redux";

import {getTweets} from "@redux/tweet/action";

const Tweets = lazy(() => import('./Tweets'));

const Home = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.tweet.tweets);

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TwitForma/>
        <Suspense fallback={<Loading/>}>
          <Tweets tweets={tweets}/>
        </Suspense>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          HEADER Home sitebar column
        </StickyHeader>
        BODY Home sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Home;
