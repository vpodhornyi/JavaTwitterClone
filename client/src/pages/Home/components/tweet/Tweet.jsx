import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const Tweet = ({item}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      TWEET
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

Tweet.propTypes = {
  item: PropTypes.object,
}
export default Tweet;
