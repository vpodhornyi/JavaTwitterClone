import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField} from "@mui/material";
import {useDebouncedCallback} from "use-debounce";
import PropTypes from "prop-types";

import TweetFormFooter from "./TweetFormFooter";
import {PATH} from "../../../../utils/constants";
import WhoCanReplyButton from "./WhoCanReplyButton";
import {ACTIONS} from "@redux/tweet/action";
import {uploadImage} from '@redux/user/action';
import ImagesList from "./imagesList/ImagesList";
import {LineLoader} from "@components";


const TwitForma = ({isReply = false, parentTweetId}) => {
  const form = useSelector(state => state.tweet.form);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const inputFiletRef = useRef();
  const {authUser: user} = useSelector(state => state.user);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');

  const debounced = useDebouncedCallback((text) => {
    dispatch(ACTIONS.setTweetFormText(text));
  }, 400);

  const handleChangeInputText = (e) => {
    setText(() => e.target.value);
    debounced(e.target.value);
  }
  const handleFocus = () => {
    !focused && setFocused(true);
  }
  const addEmoji = e => {
    if (e.emoji) {
      setText(() => text + e.emoji);
      debounced(text + e.emoji);
    }
    inputRef.current.focus();
    handleFocus();
  }

  const handleUploadImage = async (ev) => {
    if (form.images.length < form.MAX_IMAGES_COUNT) {
      handleFocus();
      const data = new FormData();
      data.append('uploadFile', ev.target.files[0]);
      inputFiletRef.current.value = null;
      dispatch(ACTIONS.setTweetFormImages({
        loading: true,
        src: ''
      }));
      const imgUrl = await dispatch(uploadImage(data));
      dispatch(ACTIONS.setTweetFormImagesSrc(imgUrl));
    }
  }

  useEffect(() => {
    setText(form.text);
  }, [form.text])

  return (
    <BoxWrapper>
      {
        form.loading && <Box sx={{
          position: 'absolute',
          top: -3,
          left: 0,
          width: '100%',
        }}>
          <LineLoader/>
        </Box>
      }
      <Link
        to={PATH.USER.profile(user.userTag)}
        className="AvatarLink">
        <Avatar className="Avatar" src={user.avatarImgUrl}/>
      </Link>
      <Box className="TweetFormWrapper">
        <Box className={focused && !isReply ? 'TextFieldBox TextFieldBox_focused' : 'TextFieldBox'}>
          <TextFieldWrapper
            inputRef={inputRef}
            onChange={handleChangeInputText}
            onFocus={handleFocus}
            placeholder={isReply ? 'Post your reply!' : 'What is happening?!'}
            value={text}
            multiline
            variant="filled"
            size='medium'
          />
          <ImagesList/>
          {focused && !isReply && <WhoCanReplyButton form={form}/>}
        </Box>
        <TweetFormFooter
          handleUploadImage={handleUploadImage}
          addEmoji={addEmoji}
          inputRef={inputRef}
          isNavigate={false}
          isReplyTweet={isReply}
          parentTweetId={parentTweetId}
          inputFiletRef={inputFiletRef}/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'none',
  position: 'relative',
  padding: '12px 16px 0 16px',

  [theme.breakpoints.up('xs')]: {
    display: 'flex',
  },

  '& .AvatarLink': {
    marginRight: '12px',
    height: '50px',
  },

  '& .Avatar': {
    width: '50px',
    height: '50px',
  },

  '& .TextFieldBox': {
    paddingBottom: '12px',

    '&_focused': {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    }
  },

  '& .TweetFormWrapper': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));
const TextFieldWrapper = styled(TextField)(({theme}) => ({
  width: '100%',
  paddingTop: '5px',
  paddingBottom: '5px',

  '& .MuiInputBase-input': {
    overflow: 'overlay !important',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.main,
    fontSize: '1.3rem',
    lineHeight: '25px',
    color: theme.palette.text.main,
  },

  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.background.main,
  },

  '& .MuiInputBase-root': {
    padding: 0, marginLeft: '10px', marginRight: '10px',
    backgroundColor: theme.palette.background.main,
  },

  '& .MuiInputBase-root:before': {
    content: 'none'
  },

  '& .MuiInputBase-root:after': {
    content: 'none'
  },
}));

TwitForma.propTypes = {
  isReply: PropTypes.bool,
  parentTweetId: PropTypes.number,
}

export default TwitForma;
