import React from "react";

import {
  ColumnWrapper,
  PrimaryColumn,
  SitebarColumn,
  StickyHeader,
  PrimaryHeader,
  Tweets,
} from "@components";
import Header from "./Header";
import {URLS} from "@services/API";

const Bookmarks = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header}/>
        <Tweets url={URLS.TWEETS.BOOKMARKS}/>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>HEADER Bookmarks sitebar column</StickyHeader>
        BODY Bookmarks sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Bookmarks;
