import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

import {CustomFabButton, CustomIconButton, EmojiPicker} from "../../../../components"
import PropTypes from "prop-types";

const TweetFormFooter = ({addEmoji}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiHandler = () => setShowEmoji(!showEmoji);

  return (
      <BoxWrapper>
        <Box className="IconsBox">
          <Box>
            <CustomIconButton color='primary' name='InsertPhotoOutlined' iconSize='small'/>
          </Box>
          {/*<Box>*/}
          {/*  <CustomIconButton color='primary' name='GifBoxOutlined' iconSize='small'/>*/}
          {/*</Box>*/}
          <EmojiBox>
            <Box onClick={emojiHandler}>
              <CustomIconButton color='primary' name='SentimentSatisfiedAltOutlined' iconSize='small'/>
            </Box>
            {showEmoji && <EmojiPicker addEmoji={addEmoji}/>}
          </EmojiBox>
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
    display: 'flex'
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
  addEmoji: PropTypes.func,
}

export default TweetFormFooter;
