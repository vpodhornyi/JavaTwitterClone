import React, {Suspense} from "react";
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import Header from "./Header";
import Loading from "../../components/Loader/Loading";
import RepliesTweet from "./components/RepliesTweet";

const RepliesTweetPage = () => {
  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={Header}/>
          <RepliesTweet/>
          <Suspense fallback={<Loading/>}>
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
}

export default RepliesTweetPage;
