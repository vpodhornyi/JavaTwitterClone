import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";

import {MoreButton, IconByName} from "@components";
import {Context} from "@utils/context";
import {Box, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const More = ({notification}) => {
  const {toggleModal} = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BoxWrapper onClick={e => e.stopPropagation()}>
      <Box
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreButton/>
      </Box>
      <Box>
        <MenuWrapper
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuList notification={notification}/>
        </MenuWrapper>
      </Box>
    </BoxWrapper>
  );
}

const MenuList = ({notification}) => {
  const {userInitiator: {userTag, isFollowing}} = notification;
  return <>
    <MenuItem>
      <ListItemIcon>
        <IconByName iconName='Person' color='text'/>
      </ListItemIcon>
      <ListItemText>
        <Typography variant='body1' fontWeight='bold'>{isFollowing ? 'Unfollow' : 'Follow'} @{userTag}</Typography>
      </ListItemText>
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <IconByName iconName='MarkChatRead' color='text'/>
      </ListItemIcon>
      <ListItemText>
        <Typography variant='body1' fontWeight='bold'>Set as read notification</Typography>
      </ListItemText>
    </MenuItem>
  </>
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
        borderBottom: `1px solid ${theme.palette.border.main}`,

        '&:last-child': {
          borderBottom: 'none',
        },

        '& .MuiTouchRipple-root': {
          display: 'none'
        },

        '&:hover': {
          backgroundColor: theme.palette.background[1],
        }
      },

    }
  },
}));
const BoxWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: 5,
  right: 5,

  '& .MuiButtonBase-root:hover': {
    transition: '0.5s',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.alpha,
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

More.propTypes = {
  notification: PropTypes.object,
}

MenuList.propTypes = {
  notification: PropTypes.object,
}

export default More;