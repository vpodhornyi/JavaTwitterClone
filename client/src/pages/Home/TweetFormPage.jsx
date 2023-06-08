import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField} from "@mui/material";

import {ModalPage, CustomIconButton} from "../../components";
import TweetFormFooter from "./components/twitForm/TweetFormFooter";
import WhoCanReplyButton from "./components/twitForm/WhoCanReplyButton";
import {Link, useNavigate} from "react-router-dom";
import {PATH} from "../../utils/constants";
import {BackgroundContext} from "../../utils/context";
import {useDebouncedCallback} from "use-debounce";
import {ACTIONS} from "@redux/tweet/action";
import {uploadImage} from '@redux/user/action';
import ImagesList from "./components/twitForm/imagesList/ImagesList";

const TweetFormPage = () => {
  const form = useSelector(state => state.tweet.form);
  const inputRef = useRef();
  const inputFiletRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const {authUser: user} = useSelector(state => state.user);
  const [text, setText] = useState('');

  const debounced = useDebouncedCallback((text) => {
    dispatch(ACTIONS.setTweetFormText(text));
  }, 400);
  const handleChangeInputText = (e) => {
    setText(() => e.target.value);
    debounced(e.target.value);
  }

  const addEmoji = e => {
    if (e.emoji) {
      setText(() => text + e.emoji);
      debounced(text + e.emoji);
    }
    inputRef.current.focus();
  }

  const handleUploadImage = async (ev) => {
    if (form.images.length < form.MAX_IMAGES_COUNT) {
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
      <Box sx={{pb: 2}}>
        <Box onClick={() => navigate(background?.pathname || PATH.ROOT)}>
          <CustomIconButton name='Close' color='text'/>
        </Box>
      </Box>
      <Box sx={{pl: 2, pr: 2}}>
        <Box sx={{display: 'flex'}}>
          <Link
            to={PATH.USER.profile(user.userTag)}
            className="AvatarLink">
            <Avatar className="Avatar" src={user.avatarImgUrl}/>
          </Link>
          <TextFieldWrapper
            inputRef={inputRef}
            onChange={handleChangeInputText}
            placeholder='What is happening?!'
            value={text}
            multiline
            variant="filled"
            size='medium'
            rows={5}
          />
        </Box>
        <ImagesList/>
        <WhoCanReplyButton form={form}/>
        <Box className='FooterWrapper'>
          <TweetFormFooter
            handleUploadImage={handleUploadImage}
            addEmoji={addEmoji}
            inputRef={inputRef}
            inputFiletRef={inputFiletRef}/>
        </Box>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  overflow: 'auto',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.main,

  [theme.breakpoints.up('sm')]: {
    marginTop: '5%',
    minWidth: '600px',
    maxHeight: '90vh',
    maxWidth: '80vw',
    borderRadius: '16px',
  },

  '& .FooterWrapper': {
    marginTop: 10,
    borderTop: `1px solid ${theme.palette.border.main}`,
  },

  '& .Avatar': {
    width: '50px',
    height: '50px',
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

// eslint-disable-next-line react/display-name
export default () => <ModalPage styles={{alignItems: 'start'}} element={<TweetFormPage/>}/>;
