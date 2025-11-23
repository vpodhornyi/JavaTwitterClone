import React, {Suspense} from 'react';
import {
  ColumnWrapper,
  PrimaryColumn,
  PrimaryHeader,
  SitebarColumn,
  StickyHeader,
  Loading
} from "@components";
import NotificationHeader from "./Header";
import NotificationsList from "./NotificationsList";

const Notifications = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={NotificationHeader}/>
        <Suspense fallback={<Loading/>}>
          <NotificationsList/>
        </Suspense>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          HEADER Notifications sitebar column
        </StickyHeader>
        BODY Notifications sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Notifications;
