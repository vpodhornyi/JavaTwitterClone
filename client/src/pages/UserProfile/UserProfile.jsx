import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import UserInfo from "./components/UserInfo/UserInfo";
import Header from "./Header";
const UserProfile = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header} isBack={true}/>
        <UserInfo/>
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER UserProfile sitebar column
        </StickyHeader>
        BODY UserProfile sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default UserProfile;
