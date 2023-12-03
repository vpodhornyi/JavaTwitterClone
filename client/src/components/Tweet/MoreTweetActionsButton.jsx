import React, {useContext} from "react";
import {useDispatch} from "react-redux";
import {ListItemIcon, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {IconByName, MoreButton, DropDownMenu} from "@components";
import DeleteTweetConfirm from "./DeleteTweetConfirm";
import {Context} from "@utils/context";
import {followUser} from "@redux/user/action";

const getItems = tweet => {
  const user = tweet.user;

  return tweet.isTweetOwner ? [
    {
      key: 'delete',
      Element: () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
        <ListItemIcon>
          <IconByName iconStyle={{color: 'red'}} iconName="DeleteOutline"/>
        </ListItemIcon>
        <Typography color='red' fontWeight='bold' variant='body1'>Delete</Typography>
      </Box>)
    },
    {
      key: 'reply',
      Element: () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
        <ListItemIcon>
          <IconByName color='text' iconName="ChatBubbleOutline"/>
        </ListItemIcon>
        <Typography fontWeight='bold' variant='body1'>Change who can reply</Typography>
      </Box>)
    }
  ] : [
    {
      key: 'follow',
      Element: () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
        <ListItemIcon>
          <IconByName color='text' iconName="PersonAddAlt"/>
        </ListItemIcon>
        <Typography color='text' fontWeight='bold' variant='body1'>
          {user?.isFollowed ? 'Unfollow': 'Follow'} @{user?.userTag}
        </Typography>
      </Box>)
    },
  ]
}

const MoreTweetActionsButton = ({tweet}) => {
  const dispatch = useDispatch();
  const {toggleModal} = useContext(Context);
  const menuClick = (key, setAnchorEl) => {
    switch (key) {
      case 'delete': {
        toggleModal(<DeleteTweetConfirm
            toggleModal={toggleModal}
            tweetId={tweet?.id}/>, true);
        setAnchorEl(null);
      }
        break;
      case 'follow': {
        dispatch(followUser(tweet?.user?.id));
        setAnchorEl(null);
      }
    }
  }

  return <DropDownMenu
      clickElement={MoreButton}
      items={getItems(tweet)}
      menuClick={menuClick}
  />
}

MoreTweetActionsButton.propTypes = {
  tweet: PropTypes.object,
}

export default MoreTweetActionsButton;
