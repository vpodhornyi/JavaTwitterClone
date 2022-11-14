import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import LogoIcon from "@components/icons/LogoIcon";
import MainMenu from "@components/navigations/mainMenu/MainMenu";
import CustomButton from "@components/CustomButton";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getLogoIconState} from "@redux/business/logoIcon/selector";

import {MAIN_COLOR} from "@utils/constants";

const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE = `
    background-color: ${MAIN_COLOR};
    color: #fff;
    border: none;
      &:hover {
        background-color: #0D80D8;
    }`;

const AppBar = () => {
  const {logo: {color, href}} = useSelector(getLogoIconState);
  const StyledBox = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <StyledBox>
      <Box>
        <Link
          color={color}
          to={href}>
          <LogoIcon/>
        </Link>
        <MainMenu/>
      </Box>
      <Box>
        <CustomButton
          customStyle={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE}
          name={"Logout"}
          onclickAction={() => {}}/>
      </Box>
    </StyledBox>
  );
}

const styles = ({theme}) => ({
  // backgroundColor: theme.palette.primary.main,
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

export default AppBar;
