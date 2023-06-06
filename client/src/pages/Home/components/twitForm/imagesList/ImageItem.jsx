import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

const ImageItem = ({src}) => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <img src={src} alt=""/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  // width: '100%',
  // display: 'flex',
}));

ImageItem.propTypes = {
  src: PropTypes.string,
}
export default ImageItem;
