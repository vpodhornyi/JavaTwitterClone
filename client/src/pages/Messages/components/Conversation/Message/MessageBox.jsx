import React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import Action from "./Action";
import Message from "./Message";

const MessageBox = () => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <Action/>
      <Message/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '87.5%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export default MessageBox;
