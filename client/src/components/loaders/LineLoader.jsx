import React from "react";
import {styled} from "@mui/material/styles";
import {Box, LinearProgress} from "@mui/material";
import PropTypes from "prop-types";

const LineLoader = ({color = 'primary', styles}) => {

  return (
    <BoxWrapper>
      <LinearProgress color={color} sx={{...styles}}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '3px 0',

  '& .MuiLinearProgress-root': {
    height: 2,
  }
}));

LineLoader.propTypes = {
  color: PropTypes.string,
  styles: PropTypes.object,
}
export default LineLoader;
