import React from "react";
import Header from './Header';
import Main from './Main';
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const BodyContainer = ({page}) => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <Header/>
      <Main page={page}/>
    </BoxWrapper>
  )
}

BodyContainer.propTypes = {
  page: PropTypes.object
}

const styles = ({theme}) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  // backgroundColor: theme.palette.primary.main,

  [theme.breakpoints.up('xs')]: {
    flexDirection: 'row',
  }
})

export default BodyContainer;
