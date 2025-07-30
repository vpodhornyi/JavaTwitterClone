import React, {useContext, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {ModalPage, CustomIconButton} from "@components";
import TweetFooter from "@components/Tweet/TweetFooter";
import {styled} from "@mui/material/styles";
import {PATH} from "@utils/constants";
import {Context} from "@utils/context";
import Slider from "./Slider";

const ImagesPage = () => {
  const [isHide, setHide] = useState(true);
  const {background, tweet} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [])

  const toggleHide = () => {
    setHide(() => !isHide);
  }

  return <BoxWrapper>
    <Box sx={{
      flexShrink: 1,
      flexGrow: 1,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CloseButtonWrapper onClick={() => navigate(background?.pathname || PATH.ROOT)}>
        <CustomIconButton title='Close' name='Close' color='white_color'/>
      </CloseButtonWrapper>

      <HideButtonWrapper onClick={() => toggleHide()}>
        <CustomIconButton title='Hide' name={isHide ? 'KeyboardDoubleArrowRight' : 'KeyboardDoubleArrowLeft'}
                          color='white_color'/>
      </HideButtonWrapper>
      <Slider images={tweet.images}/>
      <FooterWrapper>
        <TweetFooter tweet={tweet}/>
      </FooterWrapper>
    </Box>
    {
      isHide &&
      <Box sx={{
        minWidth: '350px',
        backgroundColor: 'white',
        height: '100vh',
      }}>

      </Box>
    }
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  maxHeight: '100%'
}))

const CloseButtonWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  left: 10,
  top: 10,
  zIndex: 13001,
}))

const HideButtonWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 13001,
}))

const FooterWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',

  '& .TweetFooterWrapper': {
    columnGap: '40px',
  },

  '& .IconByName': {
    fontSize: '2rem',
  }
}))

// eslint-disable-next-line react/display-name
export default () => <ModalPage styles={{
  '& .ModalWrapper': {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  }
}}
                                element={<ImagesPage/>}/>;