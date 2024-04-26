import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import ExploreHeader from "./Header";
import SearchList from "./SearchList";

const Explore = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={ExploreHeader}/>
        <SearchList/>
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER Explore sitebar column
        </StickyHeader>
        BODY Explore sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Explore;
