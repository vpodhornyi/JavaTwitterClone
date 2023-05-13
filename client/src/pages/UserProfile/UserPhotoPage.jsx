import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {ModalPage} from "../../components";

const UserPhotoPage = () => {
  const {authUser: user } = useSelector(state => state.user);

  return (
      <BoxWrapper>
        <img className="AvatarImage" src={user.avatarImgUrl} alt=""/>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .AvatarImage': {
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  }
}));

// eslint-disable-next-line react/display-name
export default () => <ModalPage element={<UserPhotoPage/>}/>;
