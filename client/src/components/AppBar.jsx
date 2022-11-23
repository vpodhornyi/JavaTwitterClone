import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import {MainMenu, LogoIcon, CustomFabButton} from "../components";
import {getLogoIconState} from "@redux/business/logoIcon/selector";
import {cancelAuthorization} from '@redux/auth/action';


const AppBar = ({authorized, menu}) => {
  const {logo: {color, href}} = useSelector(getLogoIconState);
  const dispatch = useDispatch();

  return (
    <StyledBox>
      <Box>
        <Link
          color={color}
          to={href}>
          <LogoIcon/>
        </Link>
        <MainMenu authorized={authorized} menu={menu}/>
      </Box>
      {authorized &&
        <Box onClick={() => dispatch(cancelAuthorization())}>
          <CustomFabButton
            name={"Logout"}/>
        </Box>
      }
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

const StyledBox = styled(Box)(styles);

AppBar.propTypes = {
  authorized: PropTypes.bool,
  menu: PropTypes.array,
}

export default AppBar;
