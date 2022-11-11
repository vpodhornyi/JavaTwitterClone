import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";


const Time = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Typography>12:30</Typography>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  textAlign: 'end',
  '& .MuiTypography-root': {
    textAlign: 'right'
  }

});

export default Time;
