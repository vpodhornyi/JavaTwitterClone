import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "./Header";


const ConversationInfo = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Header/>
    </StyledBox>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'

});

export default ConversationInfo;
