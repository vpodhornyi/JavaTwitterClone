import React, {useRef} from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton, CustomIconButton, EmojiPicker} from "../../../../components"
import {useSelector} from "react-redux";

const TweetFormFooter = ({handleUploadImage, addEmoji, inputFiletRef, inputRef}) => {
  const {images, MAX_IMAGES_COUNT} = useSelector(state => state.tweet.form);
  const handleFileUploadClick = () => {
    (images.length < MAX_IMAGES_COUNT) && inputFiletRef.current.click();
  };

  return (
    <BoxWrapper>
      <Box className="IconsBox">
        <Box onClick={handleFileUploadClick}>
          <CustomIconButton disabled={images.length >= MAX_IMAGES_COUNT} color='primary' name='InsertPhotoOutlined' iconSize='small'/>
          <input
            style={{display: "none"}}
            ref={inputFiletRef}
            type="file"
            onChange={handleUploadImage}
          />
        </Box>
        <EmojiPicker addEmoji={addEmoji} inputRef={inputRef}/>
      </Box>
      <CustomFabButton disabled={true} className='TweetButton' name='Tweet'/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  position: 'relative',

  '& .IconsBox': {
    display: 'flex',

    ' .InputFile': {
      visibility: 'hidden'
      ,
    }
  },

  '& .TweetButton': {
    backgroundColor: theme.palette.primary.main,
    height: '38px',

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.textWhite,
    }
  }
}));

const EmojiBox = styled(Box)(({theme}) => ({

  '& .EmojiWrapper': {
    position: 'absolute',
    left: '10px'
  }
}));

TweetFormFooter.propTypes = {
  handleUploadImage: PropTypes.func,
  addEmoji: PropTypes.func,
  inputRef: PropTypes.object,
  inputFiletRef: PropTypes.object,
}

export default TweetFormFooter;
