import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {CustomIconButton} from "../../../../components"

const CounterButton = ({name, color}) => {

  return (
    <BoxWrapper>
      <CustomIconButton size='small' name={name} color={color}/>
      <Typography variant="subtitle1" sx={{ml: '3px'}}>{0}</Typography>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

CounterButton.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
}
export default CounterButton;
