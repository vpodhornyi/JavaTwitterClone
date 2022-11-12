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
      <Box className='Overlay'>
        <Box className='MessagesBox'>
          <UserInfo/>
          <Message left={false}/>
          <Message left={true}/>
          <Message left={true}/>
          <Message left={false}/>
          <Message left={false}/>
          <Message left={true}/>
          <Message left={false}/>
          <Message left={true}/>
          <Message left={false}/>
          <Message left={false}/>
          <Message left={false}/>
        </Box>
      </Box>
      <Footer/>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  '& > .Overlay': {
    overflow: 'overlay',
    overflowX: 'hidden',
    paddingRight: 15,
    marginBottom: 55
  },

  '& > .MuiBox-root > .MessagesBox': {
    overflow: 'overlay',
    paddingLeft: 15,
    paddingRight: 15,
  }
});

export default Conversation;
