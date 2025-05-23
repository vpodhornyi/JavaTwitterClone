import React, {useContext, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField, Typography} from "@mui/material";
import {Context} from "@utils/context";
import {
  ModalPage, CustomIconButton, FollowButton, CircularLoader, AddPhotoButton
} from "@components";
import {getChatsData} from '@redux/chat/selector';
import {editGroupChat} from '@redux/chat/action';
import {PATH} from '@utils/constants';

const GroupEditPage = () => {
  const {background} = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat: chat} = useSelector(getChatsData);
  const [name, setName] = useState(chat.title);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const inputFileRef = useRef();
  const [formData, setFormData] = useState({
    name: chat.title,
    fieldUrlName: '',
    uploadFile: '',
    disabled: true,
    chatId: chat.id,
  });
  console.log(chat);
  const onChangeName = e => {
    setName(() => e.target.value);
    const text = e.target.value.trim();

    if (text === chat.title || text === '') {
      setFormData({
        ...formData,
        name: text,
        disabled: true,
      })
    } else {
      setFormData({
        ...formData,
        name: text,
        disabled: false,
      })
    }
  }

  const save = async () => {
    if (!formData.disabled) {
      setLoader(true);

      await dispatch(editGroupChat(formData));
      setLoader(false);
      navigate(background?.pathname || PATH.ROOT);
    }
  }

  return (<BoxWrapper>
    <Box className='EditHeader'>
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={() => navigate(background?.pathname || PATH.ROOT)}>
        <CustomIconButton name='Close' color='text'/>
        <Typography sx={{ml: 2}} fontWeight='fontWeightBold' fontSize='1.5rem' variant='h2'>Edit</Typography>
      </Box>
      <Box>
        <FollowButton action={save} name='Save' disabled={formData.disabled}/>
      </Box>
    </Box>
    <Box className='AddPhoto'>
      {loader && <CircularLoader/>}
      <Avatar sx={{width: '6rem', height: '6rem'}} src={formData.avatarImgUrl}/>
      <Box sx={{position: 'absolute'}}>
        <AddPhotoButton
          fieldUrlName={'avatarImgUrl'}
          fieldFileName={'uploadFile'}
          inputFileRef={inputFileRef}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </Box>
    <Box className='GroupNameFieldWrapper'>
      <TextField
        color='primary'
        sx={{width: '100%'}}
        onChange={e => onChangeName(e)}
        value={name}
        id="groupName"
        label="Group name"
        variant="outlined"/>
    </Box>
  </BoxWrapper>);
}

const Foo = () => <ModalPage element={<GroupEditPage/>}/>;

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.main, height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600, maxWidth: '80vw', minWidth: '600px', borderRadius: '16px',
  },

  '& > .EditHeader': {
    width: '100%', padding: '0 15px 0 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',

  },

  '& > .AddPhoto': {
    position: 'relative',
    borderTop: `1px solid ${theme.palette.border.main}`,
    padding: '19px 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .AddPhotoButton': {
      position: 'absolute',
      textTransform: 'none',
      boxShadow: 'none',
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(15, 20, 25, 0.75)',
      height: '3rem',
      width: '3rem',

      '&:active': {
        boxShadow: 'none',
      },

      '&:hover': {
        backgroundColor: 'rgba(39, 44, 48, 0.75)',
      },

      '& .MuiTouchRipple-root': {
        display: 'none'
      },
    }
  },

  '& > .GroupNameFieldWrapper': {
    width: '100%', padding: '11px 15px',

    '& .MuiInputBase-input': {
      color: theme.palette.text.main,
    },

    '& .MuiInputBase-root': {
      color: theme.palette.text.main,

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.main,
      }
    },

    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      }
    },
  }
}));

export default Foo;
