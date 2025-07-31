import React, {useContext, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {ModalPage, CustomIconButton} from "@components";
import TweetFooter from "@components/Tweet/TweetFooter";
import {styled} from "@mui/material/styles";
import {PATH} from "@utils/constants";
import {Context} from "@utils/context";
import Slider from "./Slider";

const ImagesPage = () => {
  const blockRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isHide, setHide] = useState(true);
  const {background, tweet} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Measure the block after it mounts
    if (blockRef.current) {
      const currentWidth = blockRef.current.offsetWidth;
      console.log("Initial width:", currentWidth);
      setWidth(currentWidth);
    }

    // Optional: handle resize
    const handleResize = () => {
      if (blockRef.current) {
        setWidth(blockRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);

    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const toggleHide = () => {
    setHide(() => !isHide);
    setWidth(!isHide ? width - 350 : width + 350);
  }

  return <BoxWrapper>
    <Box
      className='TEST'
      ref={blockRef}
      sx={{
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
      <Slider images={tweet.images} width={width}/>
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
  height: '100%',
  overflowX: 'hidden',
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