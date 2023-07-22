import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import {getChatsData} from '@redux/chat/selector';
import ChatRoute from "./ChatRoute";
import {ACTIONS, getChats} from "@redux/chat/action";
import ActionWelcome from "./ActionWelcome";
import SearchBox from "./SearchBox";
import {CircularLoader, PrimaryHeader} from "../../../../components";
import InViewElement from "../InViewElement";
import MessagesHeader from "../../Header";
import {styled} from "@mui/material/styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {isChatLoading, isChatsExist, chats, totalPages, pageNumber} = useSelector(getChatsData);

  const fetch = async () => {
    await dispatch(getChats());
  }

  useEffect(() => {
    fetch();
  }, []);

  const toggleVisible = async (inView) => {
    if (inView && (pageNumber < totalPages)) {
      setLoading(true);
      await fetch();
      setLoading(false);
    }
  }

  let element = <ActionWelcome/>;

  if (isChatLoading && !isChatsExist) {
    element = (
      <Box sx={{height: '100%', position: 'relative'}}>
        <CircularLoader/>
      </Box>
    );
  }

  if (isChatsExist) {
    element = (
      <Box>
        {chats.map(chat => <ChatRoute key={chat.key} chat={chat}/>)}
        {!loading && <InViewElement toggleVisible={toggleVisible}/>}
        {loading && (<Box sx={{position: 'relative', pt: 1, pb: 1}}>
          <CircularLoader/>
        </Box>)}
      </Box>
    )
  }

  return <>
    <PrimaryHeader pageElement={MessagesHeader}/>
    {element}
    <BoxWrapper/>
  </>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  padding: '35px 0',

  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
}));

Navigation.propTypes = {
  user: PropTypes.object,
}

export default Navigation;
