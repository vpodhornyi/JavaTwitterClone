import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField} from "@mui/material";
import PropTypes from "prop-types";

import TweetFormFooter from "./TweetFormFooter";
import {PATH} from "../../../../utils/constants";
import WhoCanReplyButton from "./WhoCanReplyButton";

const TwitForma = ({item}) => {
  const {authUser: user} = useSelector(state => state.user);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');


  const handleChangeInputText = (e) => {
    const text = e.target.value;
    if (text[text.length - 1] !== '\n') {
      setText(() => e.target.value);
    }
  }

  const handleFocus = () => {
    !focused && setFocused(true);
  }

  return (
      <BoxWrapper>
        <Link
            to={PATH.USER.profile(user.userTag)}
            state={{background: location}}
            className="AvatarLink">
          <Avatar className="Avatar" src={user.avatarImgUrl}/>
        </Link>
        <Box className="TweetFormWrapper">
          <Box className={focused ? 'TextFieldBox TextFieldBox_focused' : 'TextFieldBox'}>
            <TextFieldWrapper
                onChange={handleChangeInputText}
                onFocus={handleFocus}
                placeholder='What is happening?!'
                multiline
                variant="filled"
                size='medium'
            />
            {focused && <WhoCanReplyButton/>}
          </Box>
          <TweetFormFooter/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'none',
  padding: '12px 16px 0 16px',
  borderTop: `1px solid ${theme.palette.border.main}`,
  borderBottom: `1px solid ${theme.palette.border.main}`,

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

TwitForma.propTypes = {
  item: PropTypes.object,
}

export default TwitForma;
