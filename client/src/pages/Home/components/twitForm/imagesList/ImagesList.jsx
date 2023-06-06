import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import ImageItem from "./ImageItem";
import {getRandomKey} from "@utils";

const ImagesList = () => {
  const images = useSelector(state => state.tweet.form.images);

  return (
    <BoxWrapper>
      {images.length > 0 && images.map(item => <ImageItem key={getRandomKey()} src={item}/>)}
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',

}));

export default ImagesList;
