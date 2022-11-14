import React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomButton from "@components/__CustomButton";


const WelcomeToInbox = () => {
  const StyledBox = styled(Box)(styles);

  return (
    <StyledBox>
      <Box sx={{
        width: '320px'
      }}>
        <Typography sx={{fontWeight: 600}} variant='h2'>Welcome to your inbox!</Typography>
        <Typography sx={{pb: 3, pt: 1}} variant='body1'>Drop a line, share Tweets and more with private conversation
          between you and others on Twitter</Typography>
        <CustomButton name='Write a message'/>
      </Box>
    </StyledBox>);
}

const styles = ({theme}) => ({
  paddingTop: 20,
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

});

export default WelcomeToInbox;
