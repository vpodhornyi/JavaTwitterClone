import React from "react";

import {useSelector} from 'react-redux';
import {Link, Container, Box} from "@mui/material";
import MainMenu from "@components/navigations/MainMenu";
import LogoIcon from "@components/icons/LogoIcon";
import {getLogoIconState} from "@redux/business/logoIcon/selector";
import {cancelAuthorization} from "@redux/auth/action";
import CustomButton from "@components/CustomButton";
import {MAIN_COLOR} from "@utils/constants";

const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE = `
    background-color: ${MAIN_COLOR};
    color: #fff;
    border: none;
      &:hover {
        background-color: #0D80D8;
    }`;

const Sidebar = () => {
  const {
    logo: {
      color,
      href
    },
  } = useSelector(getLogoIconState);

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh"
    }}>
      <Box>
        <Link
          color={color}
          href={href}>
          <LogoIcon/>
        </Link>
        <MainMenu/>
      </Box>
      <Box>
        <CustomButton
          customStyle={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE}
          name={"Logout"}
          onclickAction={() => cancelAuthorization()}
        />
      </Box>
    </Container>
  );
};

export default Sidebar;
