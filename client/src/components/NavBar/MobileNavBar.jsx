import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import MainMenu from "./MainMenu";
import {mobileMenu} from '@utils/menu';
import TweetButton from './TweetButton';

const MobileNavBar = ({user, isChatSelected, countUnreadMessages, chatId}) => {
  const isDrawer = false;
  const menu = mobileMenu(user.userTag, isDrawer, isChatSelected, countUnreadMessages, chatId);

  return (
      <BoxWrapper>
        <MainMenu user={user} menu={menu}/>
        <Box className='TweetMobileButton'>
          <TweetButton/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  borderTop: `1px solid ${theme.palette.border.main}`,
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  zIndex: 999,
  backgroundColor: theme.palette.background.main,

  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },

  '& .LinkText': {
    display: 'none'
  },

  '& .NavigationMenu': {
    width: '100%',
    justifyContent: 'space-around',
  },

  '& .TweetMobileButton': {
    position: 'absolute',
    right: '30px',
    bottom: '70px',

    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  }
}));

MobileNavBar.propTypes = {
  user: PropTypes.object,
  isChatSelected: PropTypes.bool,
  countUnreadMessages: PropTypes.number,
  chatId: PropTypes.number,
}
export default MobileNavBar;
