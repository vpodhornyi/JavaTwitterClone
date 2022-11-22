import React from "react";
import PrimaryColumn from "@components/PrimaryColumn";
import SidebarColumn from "@components/SidebarColumn";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PrivateRoute from "../../components/Router/PrivateRoute";

const Root = ({authorized}) => {
  return (
    <>
      <PrimaryColumn>
        ROOT EXPLORE
      </PrimaryColumn>
      <SidebarColumn>
        SidebarColumn
      </SidebarColumn>
    </>
  );
}

Root.propTypes = {
  authorized: PropTypes.bool,
}

export default Root;
