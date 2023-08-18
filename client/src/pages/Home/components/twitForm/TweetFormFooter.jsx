import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {CustomFabButton, CustomIconButton, EmojiPicker} from "@components"
import {createTweet, quoteTweet} from "@redux/tweet/action";
import {replyTweet} from "@redux/tweet/action";

const TweetFormFooter = ({
                           handleUploadImage, addEmoji, inputFiletRef, inputRef,
                           isReplyTweet, isQuoteTweet, isNavigate = true,
                           parentTweetId, navigate, background
                         }) => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.tweet.form);
  const {images, MAX_IMAGES_COUNT, text} = form;
  const handleFileUploadClick = () => {
    (images.length < MAX_IMAGES_COUNT) && inputFiletRef.current.click();
  };

  const setDisabledTweetButton = () => {
    return !(text.trim() !== '' || images.length > 0);
  }

  const submit = () => {
    const body = {
      tweetCanReply: form.canReply,
      images: form.images.map(v => v.src),
      body: form.text,
    }

    if (!setDisabledTweetButton()) {
      switch (true) {
        case isReplyTweet:
          body.parentTweetId = parentTweetId;
          dispatch(replyTweet(body, navigate, background, isNavigate));
          break;
        case isQuoteTweet:
          body.parentTweetId = parentTweetId;
          dispatch(quoteTweet(body, navigate, background));
          break;
        default:
          dispatch(createTweet(body));
      }
    }
  }

  const getButtonName = () => isReplyTweet ? 'Reply' : 'Tweet';

  return (
      <BoxWrapper>
        <Box className="IconsBox">
          <Box onClick={handleFileUploadClick}>
            <CustomIconButton disabled={images.length >= MAX_IMAGES_COUNT} color='primary' name='InsertPhotoOutlined'
                              iconSize='small'/>
            <input
                style={{display: "none"}}
                ref={inputFiletRef}
                type="file"
                onChange={handleUploadImage}
            />
          </Box>
          <EmojiPicker addEmoji={addEmoji} inputRef={inputRef}/>
        </Box>
        <Box onClick={submit}>
          <CustomFabButton
              disabled={setDisabledTweetButton()}
              className='TweetButton'
              name={getButtonName()}/>
        </Box>
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

    '&:hover': {
      backgroundColor: theme.palette.primary.custom[700],
    },

    '& .CustomFabButtonName': {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.textWhite,
    }
  }
}));

TweetFormFooter.propTypes = {
  handleUploadImage: PropTypes.func,
  addEmoji: PropTypes.func,
  inputRef: PropTypes.object,
  isNavigate: PropTypes.bool,
  isReplyTweet: PropTypes.bool,
  isQuoteTweet: PropTypes.bool,
  parentTweetId: PropTypes.number,
  inputFiletRef: PropTypes.object,
  navigate: PropTypes.func,
  background: PropTypes.object,
}

export default TweetFormFooter;
