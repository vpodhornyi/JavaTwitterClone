import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, ListItemIcon, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {retweet} from '@redux/tweet/action';
import {IconByName, DropDownMenu} from "@components";
import CounterButton from "./CounterButton";


const getItems = (isTweetRetweeted) => [
  () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
    <ListItemIcon>
      <IconByName color='text' iconName="FlipCameraAndroid"/>
    </ListItemIcon>
    <Typography fontWeight='bold' variant='body1'>{isTweetRetweeted ? 'Undo Retweet' : 'Retweet'}</Typography>
  </Box>),
  () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
    <ListItemIcon>
      <IconByName color='text' iconName="DriveFileRenameOutlineOutlined"/>
    </ListItemIcon>
    <Typography fontWeight='bold' variant='body1'>Quote tweet</Typography>
  </Box>)
];
const Button = (retweetsCount, isTweetRetweeted) => (
  <Box className={isTweetRetweeted ? 'Retweet Retweet_active' : 'Retweet'}>
  <CounterButton name="FlipCameraAndroid" count={retweetsCount}/>
</Box>)

const RetweetButton = ({tweet}) => {
  const dispatch = useDispatch();
  const menuClick = (index, setAnchorEl) => {
    switch (index) {
      case 0: {
        dispatch(retweet(tweet.id));
        break;
      }
      case 1: {

      }
    }
    setAnchorEl(null);
  }

  return <DropDownMenu
    clickElement={() => Button(tweet.retweetsCount, tweet.isTweetRetweeted)}
    items={getItems(tweet.isTweetRetweeted)}
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
}
export default RetweetButton;
