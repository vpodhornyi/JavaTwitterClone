import React, {useContext} from "react";
import {Box} from "@mui/material";

import Action from "./Action";
import LeaveChatConfirm from "../confirms/LeaveChatConfirm";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {Context} from "@utils/context";

const LeaveChat = ({chat}) => {
  const {toggleModal} = useContext(Context);

  return (
    <BoxWrapper onClick={() => toggleModal(<LeaveChatConfirm toggleModal={toggleModal} chat={chat}/>, true)}>
      <Action name={`Leave conversation`}/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .ChatInfoActionButton': {

    '& .MuiTypography-root': {
      color: theme.palette.redAccent.main,
    },

    '&:hover': {
      backgroundColor: theme.palette.redAccent.light,
    },
  }
}))

LeaveChat.propTypes = {
  chat: PropTypes.object,
}

export default LeaveChat;
