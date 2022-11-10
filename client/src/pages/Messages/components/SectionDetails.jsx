import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import SelectMessage from "./SelectMessage";
import Chat from "./chat/Chat";
import {getMessageData} from '@redux/message/selector';
import ChatInfo from "./chatInfo/ChatInfo";


const select = (isChatSelected, isChatInfo) => {
  switch (true) {
    case isChatInfo:
      return <ChatInfo/>;
    case isChatSelected:
      return <Chat/>;
    default:
      return <SelectMessage/>;
  }
}

const SectionDetails = () => {
  const SectionWrapper = styled('section')(styles);
  const {isChatSelected, isChatInfo} = useSelector(getMessageData);

  return (
    <SectionWrapper>
      {
        select(isChatSelected, isChatInfo)
      }
    </SectionWrapper>);
}

const styles = ({theme}) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'none',
  // backgroundColor: '#00fe00',
  borderRight: '1px solid #DDDFE2',

  [theme.breakpoints.up('md')]: {
    display: 'block'
  }
});

export default SectionDetails;
