import React from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {PATH} from "@utils/constants";
import {InViewElement} from "@components";
import {moment} from "@utils";
import TweetFooter from "./TweetFooter";
import MoreTweetActionsButton from "./MoreTweetActionsButton";
import {ACTIONS, viewTweet} from "@redux/tweet/action";

const Tweet = ({tweet}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleVisible = async (inView) => {
    if (inView && !tweet?.isTweetViewed && !tweet?.isTweetOwner) {
      dispatch(viewTweet(tweet?.id));
    }
  }
  const navigateToTweetPage = () => {
    navigate(PATH.USER.tweet(tweet?.user?.userTag, tweet?.id));
    dispatch(ACTIONS.setSelectedTweet(tweet));
  }

  return (
      <BoxWrapper onClick={navigateToTweetPage}>
        <Link
            onClick={e => e.stopPropagation()}
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
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{tweet?.user.name}</Typography>
              <Typography variant='body2' sx={{ml: '5px'}}>@{tweet?.user?.userTag}</Typography>
              <Typography variant='body2' sx={{
                '&:before': {
                  content: '"·"',
                  marginLeft: '5px',
                  marginRight: '5px',
                }
              }}>{moment(tweet?.createdAt).fromNow(true)}</Typography>
            </Box>
            {tweet.isTweetOwner && <MoreTweetActionsButton tweet={tweet}/>}
          </Box>
          <Typography>{tweet.body}</Typography>
          <Box className="ImagesBox">
            {tweet?.images.length > 0 && tweet?.images.map((item, i) => <img key={item.key} src={item.imgUrl} alt=""/>)}
          </Box>
          <InViewElement toggleVisible={toggleVisible}/>
          <TweetFooter tweet={tweet}/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  padding: '12px 16px 0 16px',
  borderBottom: `1px solid ${theme.palette.border.main}`,

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.tweetBackgroundColor.main,
    transition: '0.5s',
  },

  '& .AvatarLink': {
    marginRight: 12,
  },

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
}));

Tweet.propTypes = {
  tweet: PropTypes.object,
}
export default Tweet;
