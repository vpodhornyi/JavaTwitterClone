import React from "react";
import {styled} from "@mui/material/styles";

const SectionDetails = () => {
  const StyledSection = styled('section')(styles);

  return (
    <StyledSection>
      <p>Messages</p>
    </StyledSection>);
}

const styles = ({theme}) => ({
  height: '100%',
  display: 'none',
  width: 510,
  // backgroundColor: '#00fe00',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    display: 'block'
  }
});

export default SectionDetails;
