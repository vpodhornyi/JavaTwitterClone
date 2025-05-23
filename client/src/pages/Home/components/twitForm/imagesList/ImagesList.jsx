import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

import ImageItem from "./ImageItem";
import PropTypes from "prop-types";

const ImagesList = () => {
  const images = useSelector(state => state.tweet.form.images);
  return (
    <BoxWrapper>
      {images.length > 0 && images.map((item, i) => <ImageItem key={`tweet_img_${i}`} index={i} item={item}/>)}
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}));

ImagesList.propTypes = {
  item: PropTypes.object,
}
export default ImagesList;
