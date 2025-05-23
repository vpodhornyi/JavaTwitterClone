import React, {useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

import {CircularLoader, InViewElement, Tweet} from "@components";
import {ACTIONS, getTweets} from "@redux/tweet/action";

const Tweets = ({url}) => {
  const dispatch = useDispatch();
  const {tweets, pageNumber, totalPages, loading} = useSelector(state => state.tweet);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(ACTIONS.resetGetTweets());
      await dispatch(getTweets(url));
    }
    fetch();
  }, []);

  const toggleVisible = async (inView) => {
    if (inView && (pageNumber < totalPages)) {
      await dispatch(getTweets(url));
    }
  }

  return (
      <BoxWrapper>
        {tweets.map(tweet => <Tweet key={tweet?.key} tweet={tweet}/>)}
        {!loading && <InViewElement toggleVisible={toggleVisible}/>}
        {loading && (<Box sx={{position: 'relative', pt: 3, pb: 3}}>
          <CircularLoader/>
        </Box>)}
      </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)({
  width: "100%",
});

Tweets.propTypes = {
  url: PropTypes.string,
};

export default Tweets;
