import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const Slider = ({images, width}) => {
  console.log(width);
  return <BoxWrapper
    sx={{
      width: `${width - 0}px` ,
      transition: 'width 0.3s',
    }}>
    <Swiper
      spaceBetween={100}
      slidesPerView={1}
      modules={[Navigation]}
      navigation
    >
      {images.map((item, i) => (
        <SwiperSlide key={i}>
          <img src={item.imgUrl} alt={`Slide ${i}`}/>
        </SwiperSlide>
      ))}
    </Swiper>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flex: 1,
  margin: '0 auto',
  maxHeight: '93vh',

  '& .swiper': {
    height: '100%',
    width: '100%',
  },
  '& .swiper-slide': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    height: 'auto',
  },
  '& .swiper-slide img': {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'cover',
  }
}))

Slider.propTypes = {
  images: PropTypes.array,
  width: PropTypes.number,
}

export default Slider;