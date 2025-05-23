import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {ModalPage} from "../../components";

const HeaderPhotoPage = () => {
  const {authUser: user } = useSelector(state => state.user);

  return (
      <BoxWrapper>
        <img className="HeaderImage" src={user.headerImgUrl} alt=""/>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .HeaderImage': {
    maxWidth: '100%',
    objectFit: 'cover'
  }
}));

// eslint-disable-next-line react/display-name
export default () => <ModalPage element={<HeaderPhotoPage/>}/>;
