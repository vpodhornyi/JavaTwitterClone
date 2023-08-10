import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import {useParams} from 'react-router-dom';
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import {moment} from "@utils";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import MoreTweetActionsButton from "../../Home/components/tweet/MoreTweetActionsButton";
import {ACTIONS, getTweetById} from '@redux/tweet/action';
import {CircularLoader} from "../../../components";
import TweetFooter from "../../Home/components/tweet/TweetFooter";
import ActionsTweetButtons from "./ActionsTweetButtons";

const RepliesTweet = () => {
  const {selectedTweet: tweet, tweetByIdLoading: loading} = useSelector(state => state.tweet);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (!tweet?.id) {
      dispatch(getTweetById(id));
    }
  }, [])

  return (loading ? <CircularLoader/> :
      <BoxWrapper>
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
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '0 16px',

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
