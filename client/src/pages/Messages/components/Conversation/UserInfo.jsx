import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>

    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  height: '200px',
  // backgroundColor: '#ababab'
});

export default Index;
