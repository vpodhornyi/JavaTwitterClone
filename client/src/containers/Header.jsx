import React from "react";
import {styled} from "@mui/material/styles";
import AppBar from "@components/AppBar";

const Header = () => {
  const StyledHeader = styled('header')(styles);

  return (
    <StyledHeader>
      <AppBar/>
    </StyledHeader>
  );
}

const styles = ({theme}) => ({
  display: 'none',

  [theme.breakpoints.up('xs')]: {
    flexGrow: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'end',
  },

  [theme.breakpoints.up('sm')]: {
    flexGrow: 1,
  },
})

export default Header;
