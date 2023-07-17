import React from "react";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../../../../components"

const CounterButton = ({name, count, showCounter = true}) => {

  return (
    <BoxWrapper>
      <CustomIconButton size='small' iconSize='small' name={name}/>
      {showCounter && <Typography variant="body2" sx={{ml: '2px'}}>{count}</Typography>}
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

CounterButton.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  showCounter: PropTypes.bool,
}
export default CounterButton;
