import React, {Suspense} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import Header from "./Header";
import Loading from "../../components/Loader/Loading";
import RepliesTweet from "./components/RepliesTweet"
// import {ACTIONS} from '@redux/message/action';

const RepliesTweetPage = ({item}) => {
  const dispatch = useDispatch();

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

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

RepliesTweetPage.propTypes = {
  item: PropTypes.object,
}
export default RepliesTweetPage;
