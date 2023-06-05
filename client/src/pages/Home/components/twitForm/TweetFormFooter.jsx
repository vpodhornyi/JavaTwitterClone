import React, {useRef} from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton, CustomIconButton, EmojiPicker} from "../../../../components"

const TweetFormFooter = ({handleUploadImage, addEmoji, inputRef}) => {
  const inputFiletRef = useRef();
  const handleFileUploadClick = () => {
    inputFiletRef.current.click();
  };

  return (
    <BoxWrapper>
      <Box className="IconsBox">
        <Box onClick={handleFileUploadClick}>
          <CustomIconButton color='primary' name='InsertPhotoOutlined' iconSize='small'/>
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
}

export default TweetFormFooter;
