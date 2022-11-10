import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomButton from "@components/__CustomButton";


const SectionNavigation = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Box sx={{
        width: '320px'
      }}>
        <Typography sx={{fontWeight: 600}} variant='h2'>Select a message</Typography>
        <Typography sx={{pb: 3, pt: 1}} variant='body1'>Choose from your existing conversations, start a new one, or just keep swimming.</Typography>
        <CustomButton name='New message'/>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

export default SectionNavigation;
