import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./Header";


const Chat = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <ChatHeader/>
    </StyledBox>);
}

const styles = ({theme}) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export default Chat;
