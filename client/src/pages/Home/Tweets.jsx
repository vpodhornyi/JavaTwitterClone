import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import Tweet from "./components/tweet/Tweet";
import {getTweets} from "@redux/tweet/action";

const Tweets = ({bookmarksValue = false}) => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.tweet.tweets);

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <BoxWrapper>
      {tweets.map(tweet => <Tweet key={tweet.key} tweet={tweet}/>)}
    </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)({
  width: "100%",
});

Tweets.propTypes = {
  bookmarksValue: PropTypes.bool,
};

export default Tweets;
