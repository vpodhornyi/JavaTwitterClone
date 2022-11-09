import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const PrimaryColumn = ({element: Element}) => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Element/>
    </StyledBox>
  );
}

PrimaryColumn.propTypes = {
  element: PropTypes.object
}

const styles = ({theme}) => ({
  backgroundColor: '#ff7a00',
  width: '100%',
  height: '100vh',

  [theme.breakpoints.up('sm')]: {
    width: 600,
  },
})

export default PrimaryColumn;
