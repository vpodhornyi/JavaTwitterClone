import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import MessageBox from "./MessageBox";
import Reaction from "./Reaction";
import Time from "./Time";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Box>
        <MessageBox/>
      </Box>
      <Reaction/>
      <Time/>

    </BoxWrapper>);
}

const styles = ({theme}) => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  paddingBottom: 20,
  alignItems: 'end',

  '& > .MuiBox-root': {
    display: 'flex',
    justifyContent: 'flex-end',

    '&:hover .Actions': {
      opacity: 1
    }
  },
});

export default Index;
