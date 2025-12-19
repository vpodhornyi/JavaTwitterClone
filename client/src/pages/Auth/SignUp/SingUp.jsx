import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {Box, Typography} from "@mui/material";

import {CustomFabButton} from "../../../components";
import {OrLine, Question, Container, ButtonWrapper} from '../components';
import {PATH} from "../../../utils/constants";
import {Context} from "../../../utils/context";
import {authWithGoogle} from "@redux/auth/action";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {background} = useContext(Context);


  return (
    <Container>
      <Typography className='StepTitle' variant='h1'>Join Twitter today</Typography>
      <ButtonWrapper>
        <CustomFabButton
          className='GoogleSingIn'
          name='Sign up with Google'
          onClick={() => dispatch(authWithGoogle())}
        />
      </ButtonWrapper>
      <OrLine/>
      <ButtonWrapper>
        <CustomFabButton
          onClick={() => navigate(`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_UP.SET_DATA}`, {state: {background}})}
          className='NextStepBtn'
          name='Sign up with email'/>
      </ButtonWrapper>
      <Box sx={{mt: 4}}>
        <Question
          to={`${PATH.AUTH.ROOT}/${PATH.AUTH.SING_IN.LOGIN}`}
          question={"Have an account already?"}
          link={'Log in'}
        />
      </Box>
    </Container>
  );
};

export default Auth;
