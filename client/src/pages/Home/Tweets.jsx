import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import Tweet from "./components/tweet/Tweet";

const Tweets = ({bookmarksValue = false}) => {
  const tweets = useSelector(state => state.tweet.tweets);
  return (
    <BoxWrapper>
      {tweets.map((tweet, i) => <Tweet key={i}/>)}
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
