import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import TwitterIcon from '@mui/icons-material/Twitter';
import CustomFabButton from '@components/buttons/CustomFabButton';
import OrLine from '../../components/OrLine';
import SignUpFirstStep from './SignUp/FirstStep';
import LogInFirstStep from './SingIn/FirstStep';
import {openDialog} from "@redux/dialog/action";
// import {useTheme} from "@mui/styles";
import {mediaQuery, MAIN_COLOR} from "@utils/constants";
import {Typography} from '@mui/material';
// import {useStyles} from "./styles";

const WIDTH_BUTTON_CONTAINER = '300px';
const CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_STYLE = `
    background-color: #fff;
    color: #000;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #DBE7F0;
    }`;
const CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_NAME = 'Sing up with Google';
const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE = {
  backgroundColor: '#1D9BF0',
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#0D80D8'
  }
};
const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_NAME = 'Sing up with email';
const CUSTOM_BUTTON_SING_IN_STYLE = {
  backgroundColor: '#fff',
  color: '#1D9BF0',
  border: '1px solid #DDDFE2',
  '&:hover': {
    backgroundColor: '#DBE7F0'
  }
};
const CUSTOM_BUTTON_SING_IN_NAME = 'Sing in';

const Auth = () => {
  const matches = useMediaQuery(mediaQuery.mobile);
  // const classes = useStyles(useTheme());

  return (
    <Grid container direction={'row-reverse'}>
      <Grid item xs={12} md={6}>
        <Container sx={{pb: 10}}>
          <TwitterIcon sx={{fontSize: 50, color: MAIN_COLOR}}/>
          <Typography fontWeight='fontWeightBold' variant='h1'>Happening now</Typography>
          <Typography fontWeight='fontWeightBold' variant='h2'>Join Twitter today.</Typography>
          <Grid container sx={{pt: 3, width: WIDTH_BUTTON_CONTAINER}}>
            <CustomFabButton
              sx={{bgcolor: ''}}
              customStyle={CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_STYLE}
              name={CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_NAME}
              onclickAction={() => openDialog()}
            />
            <OrLine/>
            <CustomFabButton
              customStyle={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE}
              name={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_NAME}
              onclickAction={() => openDialog(SignUpFirstStep)}
            />
            <Typography fontWeight='fontWeightBold'>Already have an
              account?</Typography>
            <CustomFabButton
              customStyle={CUSTOM_BUTTON_SING_IN_STYLE}
              name={CUSTOM_BUTTON_SING_IN_NAME}
              onclickAction={() => openDialog(LogInFirstStep)}
            />
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: matches ? '50vh' : '100vh',
          background: '#1D9BF0 url("https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png") no-repeat center center fixed',
          backgroundSize: 'cover',
        }}>
          <TwitterIcon sx={{
            fontSize: matches ? 250 : 450,
            color: '#fff'
          }}/>
        </Box>
      </Grid>
    </Grid>
  )
};

export default Auth;
