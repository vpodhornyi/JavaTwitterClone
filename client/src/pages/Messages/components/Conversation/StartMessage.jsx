import React, {useState} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";

const StartMessage = () => {
  const {isDetailLoading, message} = useSelector(getMessageData);
  const [messageText, setMessageText] = useState('');

  const foo = (e) => {
    setMessageText(e.target.value);
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
    <TextField
      sx={{
        width: '95%',
        maxHeight: '150px',
        paddingTop: '5px',
        paddingBottom: '5px',

        '& .MuiInputBase-input': {
          overflow: 'overlay !important',
          overflowX: 'hidden',
          maxHeight: '150px',
          backgroundColor: 'rgb(239, 243, 244)',
        },

        '& .MuiFilledInput-root': {
          backgroundColor: 'rgb(239, 243, 244)',
        },

        '& .MuiInputBase-root': {
          padding: 0, marginLeft: '10px', marginRight: '10px', backgroundColor: 'rgb(239, 243, 244)',

          '&:hover': {
            backgroundColor: 'rgb(239, 243, 244)',
          },
        },

        '& .MuiInputBase-root:before': {
          content: 'none'
        },

        '& .MuiInputBase-root:after': {
          content: 'none'
        },
      }}
      onChange={e => foo(e)}
      value={messageText}
      placeholder='Start a new message'
      multiline
      id="messageText"
      variant="filled"/>
    <Box>
      <CustomIconButton name='SendOutlined' iconSize='small' disabled={false}/>
    </Box>
  </Box>);
}

export default StartMessage;
