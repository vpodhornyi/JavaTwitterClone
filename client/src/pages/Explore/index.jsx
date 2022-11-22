import React from "react";
import PrimaryColumn from "@components/PrimaryColumn";
import SidebarColumn from "@components/SidebarColumn";
import PropTypes from "prop-types";

const Explore = ({authorized}) => {
  return (
    <>
      <PrimaryColumn>
        EXPLORER
      </PrimaryColumn>
      <SidebarColumn>
        SidebarColumn
      </SidebarColumn>
    </>
  );
}

Explore.propTypes = {
  authorized: PropTypes.bool,
}

export default Explore;
