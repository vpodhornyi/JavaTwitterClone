import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, styled} from "@mui/material";

import {ACTIONS, getNotifications} from "@redux/notification/action";
import Notification from "./Notification";

const NotificationsList = () => {
  const dispatch = useDispatch();
  const {notifications} = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(ACTIONS.resetGetNotifications());
    dispatch(getNotifications());
  }, []);

  return (
    <BoxWrapper>
      {notifications.map(ntfn => <Notification key={ntfn?.id + ntfn?.key} notification={ntfn}/>)}
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.border.main}`,
}))

export default NotificationsList;