import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Fab} from "@mui/material";
import PropTypes from "prop-types";

import {CircularLoader} from "@components";
import {IconByName} from "../../../../../components";
import {ACTIONS} from "@redux/tweet/action";

const ImageItem = ({index, item}) => {
  const dispatch = useDispatch();
  const deleteImg = () => {
    dispatch(ACTIONS.setTweetFormDeleteImage(index));
  }

  return (
    <BoxWrapper>
      {
        !item.loading &&
        <Fab className="DeleteButton" onClick={deleteImg}>
          <IconByName iconStyle={{fontSize: '1.3rem'}} iconName='Clear'/>
        </Fab>
      }
      {item.loading && <CircularLoader/>}
      <img src={item?.src} alt=""/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  position: 'relative',
  margin: '5px',
  borderRadius: '16px',
  flexGrow: 1,
  flexBasis: '0px',

  '& .DeleteButton': {
    position: 'absolute',
    top: 5,
    left: -25,
    marginLeft: '30px',
    textTransform: 'none',
    boxShadow: 'none',
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(15, 20, 25, 0.60)',
    height: '3rem',
    width: '3rem',

    '&:active': {
      boxShadow: 'none',
    },

    '&:hover': {
      backgroundColor: 'rgba(39, 44, 48, 0.50)',
    },

    '& .MuiTouchRipple-root': {
      display: 'none'
    }
  },

  '& img': {
    borderRadius: '16px',
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

ImageItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
}
export default ImageItem;
