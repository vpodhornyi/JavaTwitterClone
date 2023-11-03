import React from "react";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, ListItemIcon, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {retweet} from '@redux/tweet/action';
import {IconByName, DropDownMenu} from "@components";
import CounterButton from "./CounterButton";
import {PATH} from "@utils/constants";
import {CustomIconButton} from "@components";

const getItems = (tweet) => {
  const location = useLocation();

  return [
    {
      key: 'retweet',
      Element: () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
        <ListItemIcon>
          <IconByName color='text' iconName="FlipCameraAndroid"/>
        </ListItemIcon>
        <Typography fontWeight='bold' variant='body1'>{tweet.isTweetRetweeted ? 'Undo Retweet' : 'Retweet'}</Typography>
      </Box>)
    },
    {
      key: 'quote_tweet',
      Element: () => (<Link
          to={PATH.COMPOSE.TWEET}
          state={{background: location, tweetAction: {tweet, isQuoteTweet: true}}}
      >
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <ListItemIcon>
            <IconByName color='text' iconName="DriveFileRenameOutlineOutlined"/>
          </ListItemIcon>
          <Typography fontWeight='bold' variant='body1'>Quote tweet</Typography>
        </Box>
      </Link>)
    }
  ]
};
const Button = (retweetsCount, isTweetRetweeted, showCounter) => (
    <Box className={isTweetRetweeted ? 'Retweet Retweet_active' : 'Retweet'}>
      {showCounter ? <CounterButton name="FlipCameraAndroid" count={retweetsCount}/> :
          <CustomIconButton name="FlipCameraAndroid"/>}
    </Box>)

const RetweetButton = ({tweet, showCounter = true}) => {
  const dispatch = useDispatch();
  const menuClick = (index, setAnchorEl) => {
    switch (index) {
      case 'retweet': {
        dispatch(retweet(tweet.id));
        break;
      }
      case 'quote_tweet': {

      }
    }
    setAnchorEl(null);
  }

  return <DropDownMenu
      clickElement={() => Button(tweet.retweetsCount, tweet.isTweetRetweeted, showCounter)}
      items={getItems(tweet)}
      menuClick={menuClick}
      itemKey='tweet-more-button'
  />
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

RetweetButton.propTypes = {
  tweet: PropTypes.object,
  showCounter: PropTypes.bool,
}
export default RetweetButton;
