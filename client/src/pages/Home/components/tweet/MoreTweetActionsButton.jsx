import React, {useContext, useState} from "react";
import {styled} from "@mui/material/styles";
import {ListItemIcon, Box, Typography, MenuItem, Menu} from "@mui/material";
import PropTypes from "prop-types";

import {IconByName, MoreButton} from "../../../../components";
import DeleteTweetConfirm from "./DeleteTweetConfirm";
import {Context} from "@utils/context";

const MoreTweetActionsButton = ({tweet}) => {
  const {toggleModal} = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTweet = () => {
    toggleModal(<DeleteTweetConfirm toggleModal={toggleModal} tweet={tweet}/>, true);
    setAnchorEl(null);
  };

  return (
    <Box onClick={e => e.stopPropagation()}>
      <Box
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreButton/>
      </Box>
      <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}
      >
        <MenuItem
          onClick={() => deleteTweet()}
          sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ListItemIcon>
              <IconByName iconStyle={{color: 'red'}} iconName="DeleteOutline"/>
            </ListItemIcon>
            <Typography color='red' fontWeight='bold' variant='body1'>Delete</Typography>
          </Box>
        </MenuItem>
        <MenuItem
          sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ListItemIcon>
              <IconByName color='text' iconName="ChatBubbleOutline"/>
            </ListItemIcon>
            <Typography fontWeight='bold' variant='body1'>Change who can reply</Typography>
          </Box>
        </MenuItem>
      </MenuWrapper>
    </Box>);
}

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',
    backgroundColor: theme.palette.background.main,

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        padding: '11px 15px',

        '& > .IconByName': {
          color: theme.palette.primary.main,
        },

        '&:last-child': {
          borderBottom: 'none',
        },

        '& .MuiTouchRipple-root': {
          display: 'none'
        },

        '&:hover': {
          backgroundColor: theme.palette.background[1],
        }
      }
    }
  },
}));

MoreTweetActionsButton.propTypes = {
  tweet: PropTypes.object,
}
export default MoreTweetActionsButton;
