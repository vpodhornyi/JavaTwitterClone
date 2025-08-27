import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

import {CircularLoader, InViewElement, Tweet} from "@components";
import {ACTIONS, getTweets} from "@redux/tweet/action";

let scrollPositions = {};

const Tweets = ({url}) => {
  const primaryColumnRef = useRef(null);
  const [t, setT] = useState(primaryColumnRef);
  const dispatch = useDispatch();
  const {tweets, pageNumber, totalPages, loading} = useSelector(state => state.tweet);
  const location = useLocation();

/*  useEffect(() => {
    return () => {
      if (primaryColumnRef?.current) {
        scrollPositions[location.pathname] = primaryColumnRef?.current.scrollTop;
      }
      console.log(t);
    };
  }, [location.pathname]);*/

  useEffect(() => {
    dispatch(ACTIONS.resetGetTweets());
    dispatch(getTweets(url));
    setT(primaryColumnRef);
   /* console.log(t);
    console.log(scrollPositions);

    setTimeout(() => {
      const m = document.getElementById('main')
      console.log(m);
      m.scrollTop = 500;
    },2000)*/


    if (primaryColumnRef?.current) {
      // primaryColumnRef.current.scrollTop = 500;
      // primaryColumnRef.current.scrollTop = scrollPositions[location.pathname] ?? 500;
    }
  }, [location.pathname]);

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
  // primaryColumnRef: PropTypes.object,
};

export default Tweets;
