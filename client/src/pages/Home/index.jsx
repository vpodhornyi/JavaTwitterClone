import React from "react";
import PrimaryColumn from "@components/PrimaryColumn";
import SidebarColumn from "@components/SidebarColumn";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Explore from "../Explore";

const Home = ({authorized}) => {
  return (
    <>
      <PrimaryColumn>
        <Box sx={{height: '200vh'}}></Box>
      </PrimaryColumn>
      <SidebarColumn>
        SidebarColumn
      </SidebarColumn>
    </>
  );
}

Home.propTypes = {
  authorized: PropTypes.bool,
}

export default Home;
