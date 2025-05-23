import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
// import {ACTIONS} from '@redux/message/action';

const TweetPage = ({tweet}) => {
  const dispatch = useDispatch();

  return (
      <BoxWrapper>
        TWEET PAGE
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

TweetPage.propTypes = {
  tweet: PropTypes.object,
}
export default TweetPage;
