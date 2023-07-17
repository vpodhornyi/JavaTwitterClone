import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {IconButton, ListItemIcon, Box, Typography, MenuItem, Menu} from "@mui/material";
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';
import PropTypes from "prop-types";
import {IconByName} from "../../../../components";
import {useDispatch} from "react-redux";

const MoreTweetActionsButton = ({item}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTweet = (fieldName) => {
    // dispatch(ACTIONS.setTweetFormCanReply(fieldName));
    // fieldName && setSelected(LIST_ITEMS[fieldName]);
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
        <IconButton
          color='action'
          name='MoreHorizOutlined'
          title='More'
          size='small'>
          <MoreHorizOutlined/>
        </IconButton>
      </Box>
      <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}
      >
        <MenuItem
          onClick={() => deleteTweet('PUBLIC')}
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
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .MuiButtonBase-root:hover': {
    transition: '0.5s',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.alpha,
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  },
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
  item: PropTypes.object,
}
export default MoreTweetActionsButton;
