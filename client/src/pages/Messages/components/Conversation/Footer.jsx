import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import StartMessage from "./StartMessage";

const Footer = () => {
  const BoxWrapper = styled(Box)(styles);

  return (
    <BoxWrapper>
      <StartMessage/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  padding: 5,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  borderTop: '1px solid #DDDFE2',
});

export default Footer;
