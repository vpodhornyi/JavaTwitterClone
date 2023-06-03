import React, {useContext, useState} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField} from "@mui/material";
import PropTypes from "prop-types";

import {ModalPage, CustomIconButton} from "../../components";
import TweetFormFooter from "./components/twitForm/TweetFormFooter";
import WhoCanReplyButton from "./components/twitForm/WhoCanReplyButton";
import {Link, useNavigate} from "react-router-dom";
import {PATH} from "../../utils/constants";
import {BackgroundContext} from "../../utils/context";

const TweetFormPage = ({item}) => {
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const {authUser: user} = useSelector(state => state.user);
  const [text, setText] = useState('');


  const handleChangeInputText = (e) => {
    const text = e.target.value;
    if (text[text.length - 1] !== '\n') {
      setText(() => e.target.value);
    }
  }

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
                onChange={handleChangeInputText}
                placeholder='What is happening?!'
                multiline
                variant="filled"
                size='medium'
                rows={5}
            />
          </Box>
          <WhoCanReplyButton/>
          <Box className='FooterWrapper'>
            <TweetFormFooter/>
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
    fontSize: '1.5rem',
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

TweetFormPage.propTypes = {
  item: PropTypes.object,
}
// eslint-disable-next-line react/display-name
export default () => <ModalPage styles={{alignItems: 'start'}} element={<TweetFormPage/>}/>;
