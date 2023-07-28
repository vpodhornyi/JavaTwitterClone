import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  ColumnWrapper,
  PrimaryColumn,
  SitebarColumn,
  StickyHeader,
  PrimaryHeader,
} from "../../components";
import Tweets from "../Home/Tweets";
import Header from "./Header";
import {getBookmarks} from "@redux/tweet/bookmark/action";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.bookmark.bookmarks);

  useEffect(() => {
    dispatch(getBookmarks());
  }, []);

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header}/>
        <Tweets tweets={tweets} bookmarksValue={true}/>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>HEADER Bookmarks sitebar column</StickyHeader>
        BODY Bookmarks sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Bookmarks;
