import React, {lazy, Suspense, useEffect} from "react";

import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader, Tweets} from '@components';
import Loading from "../../components/Loader/Loading";
import TwitForma from "./components/twitForm/TwitForma";
import HomeHeader from "./Header";

import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {URLS} from "@services/API";

// const Tweets = lazy(() => import('./Tweets'));

const Home = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TweetFormWrapper>
          <TwitForma/>
        </TweetFormWrapper>
        <Suspense fallback={<Loading/>}>
          <Tweets url={URLS.TWEETS.ROOT}/>
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

const TweetFormWrapper = styled(Box)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.border.main}`,
  borderBottom: `1px solid ${theme.palette.border.main}`,
}));

export default Home;
