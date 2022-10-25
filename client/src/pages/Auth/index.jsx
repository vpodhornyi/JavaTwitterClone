import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import TwitterIcon from '@mui/icons-material/Twitter';
import CustomButton from '@components/CustomButton';
import OrLine from '@components/OrLine';
import SignUpFirstStep from './SignUp/FirstStep';
import LogInFirstStep from './SingIn/FirstStep';
import {openDialog} from "@redux/dialog/action";
import {mediaQuery, MAIN_COLOR} from "@utils/constants";

const WIDTH_BUTTON_CONTAINER = '300px';
const CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_STYLE = `
    background-color: #fff;
    color: #000;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #DBE7F0;
    }`;
const CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_NAME = 'Sing up with Google';
const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE = `
    background-color: ${MAIN_COLOR};
    color: #fff;
    border: none;
      &:hover {
        background-color: #0D80D8;
    }`;
const CUSTOM_BUTTON_SING_UP_WITH_EMAIL_NAME = 'Sing up with email';
const CUSTOM_BUTTON_SING_IN_STYLE = `
    background-color: #fff;
    color: #1D9BF0;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #DBE7F0;
    }`;
const CUSTOM_BUTTON_SING_IN_NAME = 'Sing in';

const Auth = () => {
  const matches = useMediaQuery(mediaQuery.mobile);

  return (
    <Grid container direction={'row-reverse'}>
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Grid container sx={{pl: 2, pb: 10}}>
          <Container>
            <TwitterIcon sx={{fontSize: 50, color: MAIN_COLOR}}/>
            <Box sx={{
              fontFamily: 'Arial',
              fontWeight: 600,
              fontSize: matches ? 42 : 82,
            }}>Happining now</Box>
            <Box sx={{
              padding: '30px 0',
              fontFamily: 'Arial',
              fontWeight: 600,
              fontSize: matches ? 20 : 32,
            }}>Join Twitter today.</Box>
            <Grid container sx={{pt: 3, width: WIDTH_BUTTON_CONTAINER}}>
              <Grid item xs={12}>
                <CustomButton
                  customStyle={CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_STYLE}
                  name={CUSTOM_BUTTON_SING_UP_WITH_GOOGLE_NAME}
                  onclickAction={() => openDialog()}
                />
              </Grid>
              <Grid item xs={12}>
                <OrLine/>
              </Grid>
              <Grid item xs={12}>
                <CustomButton
                  customStyle={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_STYLE}
                  name={CUSTOM_BUTTON_SING_UP_WITH_EMAIL_NAME}
                  onclickAction={() => openDialog(SignUpFirstStep)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{
                  fontWeight: 600,
                  padding: '50px 0 20px 0'
                }}>Alredy have an account?</Box>
              </Grid>
              <Grid item xs={12}>
                <CustomButton
                  customStyle={CUSTOM_BUTTON_SING_IN_STYLE}
                  name={CUSTOM_BUTTON_SING_IN_NAME}
                  onclickAction={() => openDialog(LogInFirstStep)}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: MAIN_COLOR,
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
  );
};

export default Auth;
