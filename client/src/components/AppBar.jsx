import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import LogoIcon from "@components/icons/LogoIcon";
import MainMenu from "./MainMenu";
import CustomFabButton from "@components/buttons/CustomFabButton";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getLogoIconState} from "@redux/business/logoIcon/selector";
import {cancelAuthorization} from '@redux/auth/action';
import PropTypes from "prop-types";


const AppBar = ({authorized}) => {
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
        <MainMenu authorized={authorized}/>
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
}

export default AppBar;
