import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import ClearAllBookmarks from "./ClearAllBookmarks";

const Header = ({user}) => {

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

Header.propTypes = {
  user: PropTypes.object,
}
export default Header;
