import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, TextField} from "@mui/material";
import {getMessageData} from "@redux/message/selector";
import CustomIconButton from "@components/buttons/CustomIconButton";

const StartMessage = () => {
  const BoxWrapper = styled(Box)(styles);
  const TextFieldWrapper = styled(TextField)(TextFieldStyles);
  const {isDetailLoading} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <Box>
        <CustomIconButton name='PermMediaOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton name='GifBoxOutlined' iconSize='small'/>
      </Box>
      <Box>
        <CustomIconButton name='EmojiEmotionsOutlined' iconSize='small'/>
      </Box>
      <TextFieldWrapper placeholder='Start a new message' fullWidth multiline id="filled-basic" variant="filled"/>
      <Box>
        <CustomIconButton name='SendOutlined' iconSize='small' disabled={true}/>
      </Box>
    </BoxWrapper>);
}

const TextFieldStyles = ({theme}) => ({
  maxHeight: '150px',
  paddingTop: 5,
  paddingBottom: 5,

  '& .MuiInputBase-input': {
    backgroundColor: 'rgb(239, 243, 244)',
  },

  '& .MuiFilledInput-root': {
    backgroundColor: 'rgb(239, 243, 244)',
  },

  '& .MuiInputBase-root': {
    padding: 0,
    marginLeft: 10,
    backgroundColor: 'rgb(239, 243, 244)',

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
});

const styles = ({theme}) => ({
  padding: 5,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 243, 244)',
  borderRadius: 16
});

export default StartMessage;
