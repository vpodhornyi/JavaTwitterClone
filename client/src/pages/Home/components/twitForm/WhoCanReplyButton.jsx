import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, MenuItem, Menu, Typography} from "@mui/material";
import PropTypes from "prop-types";

const WhoCanReplyButton = ({item}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <BoxWrapper>
        <FollowButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
          <Typography fontWeight='bold'>Everyone can reply</Typography>
        </FollowButton>
        <MenuWrapper
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
        >
          <Box sx={{p: 2}}>
            <Typography>
              Who can reply?
            </Typography>
            <Typography>
              Choose who can reply to this Tweet.
            </Typography>
            <Typography>
              Anyone mentioned can always reply.
            </Typography>
          </Box>
          <MenuItem onClick={handleClose}>Everyone</MenuItem>
          <MenuItem onClick={handleClose}>People you follow</MenuItem>
        </MenuWrapper>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.main,
  }
}));

const FollowButton = styled(Box)(({theme}) => ({
  padding: '2px 15px',
  borderRadius: '16px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.primary.alpha,
    transition: '0.5s'
  },

  '& .MuiTypography-root': {
    color: theme.palette.primary.main,
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
        // borderBottom: `1px solid ${theme.palette.border.main}`,

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
  item: PropTypes.object,
}
export default WhoCanReplyButton;
