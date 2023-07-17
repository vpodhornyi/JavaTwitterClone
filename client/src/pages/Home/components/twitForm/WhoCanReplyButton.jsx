import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, MenuItem, Menu, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {IconByName} from "../../../../components";
import {ACTIONS} from "@redux/tweet/action";


const WhoCanReplyButton = ({form}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const LIST_ITEMS = {
    PUBLIC: {
      key: 'PUBLIC',
      name: 'Everyone can reply',
      icon: 'Public',
    },
    PEOPLE_FOLLOW: {
      key: 'PEOPLE_FOLLOW',
      name: 'People you follow can reply',
      icon: 'PeopleAlt',
    }
  }
  const [selected, setSelected] = useState(LIST_ITEMS[form.canReply]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleItemClick = (fieldName) => {
    dispatch(ACTIONS.setTweetFormCanReply(fieldName));
    fieldName && setSelected(LIST_ITEMS[fieldName]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setSelected(LIST_ITEMS[form.canReply]);
  }, [form.canReply])

  return (
    <BoxWrapper>
      <FollowButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconByName iconName={selected.icon}/>
        <Typography fontWeight='bold'>{selected.name}</Typography>
      </FollowButton>
      <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className="TitleBox" sx={{p: 2}}>
          <Typography fontWeight="Bold">
            Who can reply?
          </Typography>
          <Typography variant="body2">
            Choose who can reply to this Tweet.
          </Typography>
          <Typography variant="body2">
            Anyone mentioned can always reply.
          </Typography>
        </Box>
        <MenuItem
          onClick={() => handleItemClick('PUBLIC')}
          sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconByNameWrapper>
              <IconByName iconName="Public"/>
            </IconByNameWrapper>
            <Typography fontWeight="Bold">Everyone</Typography>
          </Box>
          {(selected.key === 'PUBLIC') && <IconByName iconName="CheckOutlined"/>}
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick('PEOPLE_FOLLOW')}
          sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconByNameWrapper>
              <IconByName iconName="PeopleAlt"/>
            </IconByNameWrapper>
            <Typography fontWeight="Bold">People you follow</Typography>
          </Box>
          {(selected.key === 'PEOPLE_FOLLOW') && <IconByName iconName="CheckOutlined"/>}
        </MenuItem>
      </MenuWrapper>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  marginTop: 10,

  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.main,
  }
}));
const IconByNameWrapper = styled(Box)(({theme}) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginRight: '12px',

  '& > .IconByName': {
    color: theme.palette.common.white,
  }
}));
const FollowButton = styled(Box)(({theme}) => ({
  padding: '3px 10px',
  borderRadius: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: theme.palette.primary.alpha,
    transition: '0.5s'
  },

  '& .MuiTypography-root': {
    color: theme.palette.primary.main,
  },

  '& .IconByName': {
    color: theme.palette.primary.main,
    marginRight: '5px',
  },
}));
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

WhoCanReplyButton.propTypes = {
  form: PropTypes.object,
}
export default WhoCanReplyButton;
