import React from "react";
import {styled} from "@mui/material/styles";

import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.primary.secondary,
  display: 'none',
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: 290,
  },
  [theme.breakpoints.up('lg')]: {
    width: 350,
  }
}));

const SidebarColumn = () => {

  return (
    <StyledBox>

    </StyledBox>
  );
}

export default SidebarColumn;
