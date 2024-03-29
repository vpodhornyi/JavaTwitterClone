import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {openDialog, closeDialog} from "@redux/dialog/action";
import OrLine from '@components/OrLine';
import CustomButton from '@components/CustomButton';
import SingInSecondStep from '../SecondStep';
import ForgotPassword from '../ForgotPassword';
import {MAIN_COLOR} from "@utils/constants";

const CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_STYLE = `
    background-color: #fff;
    color: #000;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #DBE7F0;
    }`;
const CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_NAME = 'Sing in with Google';
const CUSTOM_BUTTON_NEXT_STYLE = `
    background-color: #000;
    color: #fff;
      &:hover {
        background-color: #444;
    }`;
const CUSTOM_BUTTON_NEXT_NAME = 'Next';
const CUSTOM_BUTTON_FORGOT_PASSWORD_STYLE = `
    background-color: #fff;
    color: #000;
    border: 1px solid #DDDFE2;
      &:hover {
        background-color: #ddd;
    }`;
const CUSTOM_BUTTON_FORGOT_PASSWORD_NAME = 'Forgot password?';

const SingInFirstStep = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{padding: '0 100px', width: '400px', height: '100%',}}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <IconButton aria-label="close" sx={{
          position: 'absolute',
          top: 5,
          left: 5,
        }}
                    onClick={() => dispatch(closeDialog())}>
          <CloseIcon/>
        </IconButton>
        <TwitterIcon sx={{fontSize: 40, color: MAIN_COLOR}}/>
      </Box>
      <Box sx={{
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Box>
          <DialogTitle sx={{pb: 7}}>Sign in to Twitter</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12} sx={{pb: 1}}>
                <CustomButton
                  customStyle={CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_STYLE}
                  name={CUSTOM_BUTTON_SING_IN_WITH_GOOGLE_NAME}
                  onclickAction={() => openDialog()}
                />
              </Grid>
              <Grid item xs={12}>
                <OrLine/>
              </Grid>
              <Grid item sx={{padding: '10px 0 30px 0'}}>
                <TextField id="email" sx={{width: '100%'}} label="Phone, email or username" variant="outlined"/>
              </Grid>
            </Grid>
            <Grid item sx={{padding: '10px 0 30px 0'}}>
              <CustomButton
                customStyle={CUSTOM_BUTTON_NEXT_STYLE}
                name={CUSTOM_BUTTON_NEXT_NAME}
                onclickAction={() => openDialog(SingInSecondStep)}
              />
            </Grid>
            <Grid item sx={{padding: '10px 0 30px 0'}}>
              <CustomButton
                customStyle={CUSTOM_BUTTON_FORGOT_PASSWORD_STYLE}
                name={CUSTOM_BUTTON_FORGOT_PASSWORD_NAME}
                onclickAction={() => openDialog(ForgotPassword)}
              />
            </Grid>
            <DialogContentText sx={{fontSize: 15, pt: 5}}>
              {`Don't have an account? Sign up`}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Box>
    </Box>
  );
}

export default SingInFirstStep;
