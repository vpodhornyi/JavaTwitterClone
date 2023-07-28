import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import Tweet from "./components/tweet/Tweet";

const Tweets = ({tweets, bookmarksValue = false}) => {
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
  tweets: PropTypes.array,
  bookmarksValue: PropTypes.bool,
};

export default Tweets;
