import React, {lazy, Suspense} from "react";

import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from '../../components';
import Loading from "../../components/Loader/Loading";
import TwitForma from "./components/twitForm/TwitForma";
import HomeHeader from "./Header";

const Tweets = lazy(() => import('./Tweets'));

const Home = () => {

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TwitForma/>
        <Suspense fallback={<Loading/>}>
          <Tweets/>
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
