import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatHeader from "./Header";
import {getMessageData} from "@redux/message/selector";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import Message from "./Message";

const Conversation = () => {
  const BoxWrapper = styled(Box)(styles);
  const {isDetailLoading} = useSelector(getMessageData);

  return (
    <BoxWrapper>
      <UserInfo/>
      <Message/>
      <Footer/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  paddingLeft: 15,
  paddingRight: 15,
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export default Conversation;
