import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box} from "@mui/material";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Avatar sx={{mr: '10px', width: '5rem', height: '5rem'}} src={''}/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  paddingTop: 57,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #DDDFE2',
  marginBottom: 15
});

export default Index;
