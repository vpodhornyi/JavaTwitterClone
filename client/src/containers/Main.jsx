import React from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const Main = ({page: Page}) => {
  const StyledMain = styled('main')(styles);
  return (
    <StyledMain>
      <Box>
        <Page/>
      </Box>
    </StyledMain>
  )
};

Main.propTypes = {
  page: PropTypes.object
}

const styles = ({theme}) => ({
  // backgroundColor: theme.palette.primary.secondary,
  flexGrow: 1,
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    flexGrow: 2,
  },

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
  },

  '& > .MuiBox-root': {
    width: '100%',
    height: '100%',

    [theme.breakpoints.up('sm')]: {
      width: 600,
    },

    [theme.breakpoints.up('md')]: {
      width: 920,
    },

    [theme.breakpoints.up('lg')]: {
      width: 990,
    }
  }
});

export default Main;
