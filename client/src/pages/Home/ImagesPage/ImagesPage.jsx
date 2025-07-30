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
    console.log(tweet);
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [])

  const toggleHide = () => {
    setHide(() => !isHide);
  }

  return <BoxWrapper>
    <Box sx={{
      minHeight: '100vh',
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
        <CustomIconButton title='Hide' name={isHide ? 'KeyboardDoubleArrowRight' : 'KeyboardDoubleArrowLeft'} color='white_color'/>
      </HideButtonWrapper>
      <Box sx={{
        flex: 1
      }}>
        <Slider/>
        <img src={tweet.images[1].imgUrl} alt=""/>
      </Box>
      <FooterWrapper>
        <TweetFooter tweet={tweet}/>
      </FooterWrapper>
    </Box>
    {
      isHide &&
      <Box sx={{
        width: '350px',
        backgroundColor: 'white',
        height: '100vh',
      }}>

      </Box>
    }
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
}))

const CloseButtonWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  left: 10,
  top: 10
}))

const HideButtonWrapper = styled(Box)(({theme}) => ({
  position: 'absolute',
  right: 10,
  top: 10
}))

const FooterWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',

  '& .TweetFooterWrapper': {
    columnGap: '40px',
  },

  '& .IconByName': {
    fontSize: '1.8rem',
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