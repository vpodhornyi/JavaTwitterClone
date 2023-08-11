import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux"
import {useParams, Link} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import {moment} from "@utils";
import PropTypes from "prop-types";

import {PATH} from "../../../utils/constants";
import MoreTweetActionsButton from "../../Home/components/tweet/MoreTweetActionsButton";
import {getTweetById} from '@redux/tweet/action';
import {ACTIONS as REPLIES_ACTIONS, getTweetReplies} from '@redux/tweet/replies/action';
import {CircularLoader, InViewElement} from "@components";
import ActionsTweetButtons from "./ActionsTweetButtons";
import Tweet from "../../Home/components/tweet/Tweet";

const RepliesTweet = () => {
  const {selectedTweet: tweet, tweetByIdLoading} = useSelector(state => state.tweet);
  const {replies, pageNumber, totalPages, loading: repliesLoading} = useSelector(state => state.replies);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    const fetch = async () => {
      await dispatch(REPLIES_ACTIONS.reset());
      await dispatch(getTweetById(id));
      await dispatch(getTweetReplies(id));
    }
    fetch();
  }, [tweet?.id, id]);

  const toggleVisible = async (inView) => {
    if (!tweetByIdLoading && inView && (pageNumber < totalPages)) await dispatch(getTweetReplies(id));
  }

  return (<BoxWrapper>
    {tweetByIdLoading && <CircularLoader/>}
    <Box sx={{display: 'flex'}}>
      <Link
          to={PATH.USER.profile(tweet?.user?.userTag)}
          className="AvatarLink">
        <Avatar className="Avatar" src={tweet?.user?.avatarImgUrl}/>
      </Link>
      <Box sx={{width: '100%'}}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ml: 2, display: 'flex', flexDirection: 'column'}}>
            <Typography fontWeight='bold'>{tweet?.user?.name}</Typography>
            <Typography variant='body2'>@{tweet?.user?.userTag}</Typography>
          </Box>
          {<MoreTweetActionsButton tweet={tweet}/>}
        </Box>
      </Box>
    </Box>
    <Box sx={{mt: 1}}>
      <Typography>{tweet?.body}</Typography>
      <Box className="ImagesBox">
        {tweet?.images?.length > 0 && tweet?.images?.map((item, i) => <img key={item.key} src={item.imgUrl}
                                                                           alt=""/>)}
      </Box>
      <Box className="Wrapper">
        <Typography
            variant='body2'>
          {moment(tweet?.createdAt).format('h:mm A · MMMM D, YYYY ·')}
        </Typography>
        <Quantity count={tweet?.viewsCount} name={"Views"}/>
      </Box>
      <Box className="Wrapper WrapperQuantity">
        <Quantity count={tweet?.retweetsCount} name={"Retweets"}/>
        <Quantity count={tweet?.quoteTweetsCount} name={"Quotes"}/>
        <Quantity count={tweet?.likesCount} name={"Likes"}/>
        <Quantity count={tweet?.bookmarksCount} name={"Bookmarks"}/>
      </Box>
      <Box>
        <ActionsTweetButtons tweet={tweet}/>
      </Box>
      <Box>
        {replies.map(tweet => <Tweet key={tweet.key} tweet={tweet}/>)}
        {!repliesLoading && <InViewElement toggleVisible={toggleVisible}/>}
        {repliesLoading && (<Box sx={{position: 'relative', pt: 3, pb: 3}}>
          <CircularLoader/>
        </Box>)}
      </Box>
    </Box>
  </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '0 16px',
  position: 'relative',

  '& .ImagesBox': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    '& img': {
      marginTop: 12,
      borderRadius: '16px',
      maxWidth: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  },

  '.Counter': {
    fontWeight: 600,
  },

  '.Wrapper': {
    display: 'flex',
    padding: '6px 0 6px 0',
    borderBottom: `1px solid ${theme.palette.border.main}`,

    '&Quantity': {
      justifyContent: 'space-around'
    }
  }
}));
const Quantity = ({count, name}) => {
  return (<Box sx={{
    display: 'flex',
    ml: 1
  }}>
    <Typography variant='body2' sx={{
      fontSize: '1rem',
    }}><span className='Counter'>{count}</span> {name}</Typography>
  </Box>)
}

Quantity.propTypes = {
  count: PropTypes.number,
  name: PropTypes.string,
}

export default RepliesTweet;
