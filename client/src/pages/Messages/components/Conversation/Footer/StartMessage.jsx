import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";
// import CustomTextField from "./CustomTextField";
import {sendMessage, setMessage} from "@redux/message/action";
import PropTypes from "prop-types";

const StartMessage = ({input: Input}) => {
  const {isDetailLoading, message, currentConversation} = useSelector(getMessageData);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    // setText(e.target.value);

    dispatch(setMessage({text: e.target.value}));
  }

  const buttonClickSend = () => {
    dispatch(sendMessage({text: message, currentConversation}));
    // setText('');
    dispatch(setMessage({text: ''}));
  }

  const enterKeyDownSend = (e) => {
    if (e.keyCode === 13) {
      dispatch(sendMessage({text: message, currentConversation}));
      // setText('');
      dispatch(setMessage({text: ''}));
    }
  }

  return (<Box sx={{
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(239, 243, 244)',
    borderRadius: '16px'
  }}>
    <Box>
      <CustomIconButton name='PermMediaOutlined' iconSize='small'/>
    </Box>
    <Box>
      <CustomIconButton name='GifBoxOutlined' iconSize='small'/>
    </Box>
    <Box>
      <CustomIconButton name='EmojiEmotionsOutlined' iconSize='small'/>
    </Box>
    <Input enterKeyDownSend={enterKeyDownSend} onChange={onChange} text={message}/>
    <Box onClick={buttonClickSend}>
      <CustomIconButton name='SendOutlined' iconSize='small' disabled={false}/>
    </Box>
  </Box>);
}

StartMessage.propTypes = {
  input: PropTypes.func
}

export default StartMessage;
