import React from "react";
import Header from '../Header';
import Main from '../Main';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const MainContainer = ({page}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header/>
      <Main page={page}/>
    </Box>
  )
}

MainContainer.propTypes = {
  page: PropTypes.object
}

export default MainContainer;
