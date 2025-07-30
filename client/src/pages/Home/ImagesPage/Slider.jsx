import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

const Slider = ({images}) => {
  return <BoxWrapper>
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
  flex: 1,
  width: '100%',
  maxWidth: '800px',
  height: '80%',
  margin: '0 auto',

  '& .swiper': {
    height: '100%',
    width: '100%',
  },
  '& .swiper-slide': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .swiper-slide img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
}
}))

Slider.propTypes = {
  images: PropTypes.array,
}

export default Slider;