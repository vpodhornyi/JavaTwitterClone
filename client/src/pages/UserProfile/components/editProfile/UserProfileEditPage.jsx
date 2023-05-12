import React, {useContext, useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box, TextField, Typography} from "@mui/material";

import {BackgroundContext} from "@utils/context";
import {ModalPage, CustomIconButton, FollowButton} from "../../../../components";
import FormElement from "./FormElement";
import {getChatsData} from '@redux/chat/selector';
import {updateUserProfile, uploadImage} from '@redux/user/action';
import {PATH} from '@utils/constants';

const UserProfileEditPage = () => {
  const {background} = useContext(BackgroundContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat: chat} = useSelector(getChatsData);
  const {authUser: user} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    headerImgUrl: '',
    avatarImgUrl: '',
    disabled: true,
  });

  useEffect(() => {
    setFormData({
      name: user?.name,
      bio: user?.bio,
      location: user?.location,
      headerImgUrl: user?.headerImgUrl,
      avatarImgUrl: user?.avatarImgUrl,
      disabled: true,
    })
  }, [])

  const save = async () => {
    if (!formData.disabled) {
      setLoader(true);

      if (user.headerImgUrl !== formData.headerImgUrl) {
        const data = new FormData();
        data.append('uploadFile', formData.headerImgFile);
        formData.headerImgUrl = await dispatch(uploadImage(data));
        delete formData.headerImgFile;
      }

      if (user.avatarImgUrl !== formData.avatarImgUrl) {
        const data = new FormData();
        data.append('uploadFile', formData.avatarImgFile);
        formData.avatarImgUrl = await dispatch(uploadImage(data));
        delete formData.avatarImgFile;
      }

      await dispatch(updateUserProfile(formData));
      setLoader(false);
      navigate(background?.pathname || PATH.ROOT);
    }
  }

  return (
      <BoxWrapper>
        <Box className='EditHeader'>
          <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => navigate(background?.pathname || PATH.ROOT)}>
            <CustomIconButton name='Close' color='text'/>
            <Typography sx={{ml: 2}} fontWeight='fontWeightBold' fontSize='1.5rem' variant='h2'>Edit
              profile</Typography>
          </Box>
          <Box onClick={save}>
            <FollowButton name='Save' disabled={formData.disabled}/>
          </Box>
        </Box>
        <FormElement user={user} formData={formData} setFormData={setFormData}/>
      </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.main,
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600,
    maxWidth: '80vw',
    minWidth: '600px',
    borderRadius: '16px',
  },

  '& > .EditHeader': {
    width: '100%',
    padding: '0 15px 0 5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

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
}));

// eslint-disable-next-line react/display-name
export default () => <ModalPage element={<UserProfileEditPage/>}/>;