import React from "react";
import {styled} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

import ClearAllBookmarks from "./ClearAllBookmarks";

const Header = () => {
  const {authUser: user} = useSelector(state => state.user);

  return (
    <BoxWrapper>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography className='HeaderTitle' variant='h2'>Bookmarks</Typography>
        <Typography variant='body2'>@{user?.userTag}</Typography>
      </Box>
      <ClearAllBookmarks/>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
export default Header;
