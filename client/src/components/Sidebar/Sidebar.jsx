import React from "react";

import {useSelector} from 'react-redux';
import {Link, Container, Box} from "@mui/material";
import MainMenu from "@components/navigations/MainMenu";
import LogoIcon from "@components/icons/LogoIcon";
import {getLogoIconState} from "@redux/business/logoIcon/selector";

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
      <Box sx={{
        backgroundColor: "#fe0000"
      }}>
        Avatar
      </Box>
    </Container>
  );
};

export default Sidebar;
