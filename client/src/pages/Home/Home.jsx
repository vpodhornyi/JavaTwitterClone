import React, {lazy, Suspense, useRef} from "react";

import {
  ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader,
  Tweets,
  Loading
} from '@components';
import TwitForma from "./components/twitForm/TwitForm";
import HomeHeader from "./Header";

import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {URLS} from "@services/API";

// const Tweets = lazy(() => import('./Tweets'));

const Home = () => {
  const primaryColumnRef = useRef(null);

  return (
    <ColumnWrapper>
      <PrimaryColumn ref={primaryColumnRef}>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TweetFormWrapper>
          <TwitForma/>
        </TweetFormWrapper>
        <Suspense fallback={<Loading/>}>
          <Tweets url={URLS.TWEETS.ROOT} primaryColumnRef={primaryColumnRef}/>
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
