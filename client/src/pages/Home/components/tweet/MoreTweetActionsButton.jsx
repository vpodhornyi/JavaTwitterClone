import React, {useContext} from "react";
import {ListItemIcon, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {IconByName, MoreButton, DropDownMenu} from "@components";
import DeleteTweetConfirm from "./DeleteTweetConfirm";
import {Context} from "@utils/context";

const items = [
  () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
    <ListItemIcon>
      <IconByName iconStyle={{color: 'red'}} iconName="DeleteOutline"/>
    </ListItemIcon>
    <Typography color='red' fontWeight='bold' variant='body1'>Delete</Typography>
  </Box>),
  () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
    <ListItemIcon>
      <IconByName color='text' iconName="ChatBubbleOutline"/>
    </ListItemIcon>
    <Typography fontWeight='bold' variant='body1'>Change who can reply</Typography>
  </Box>)
]


const MoreTweetActionsButton = ({tweet}) => {
  const {toggleModal} = useContext(Context);
  const menuClick = (index, setAnchorEl) => {
    switch (index) {
      case 0: {
        toggleModal(<DeleteTweetConfirm
            toggleModal={toggleModal}
            tweetId={tweet.id}/>, true);
        setAnchorEl(null);
      }
    }
  }

  return <DropDownMenu
      clickElement={MoreButton}
      items={items}
      menuClick={menuClick}
      itemKey='tweet-more-button'
  />
}

MoreTweetActionsButton.propTypes = {
  tweet: PropTypes.object,
}

export default MoreTweetActionsButton;
