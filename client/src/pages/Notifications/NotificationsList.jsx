import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, styled} from "@mui/material";

import {CircularLoader, InViewElement} from "@components";
import {ACTIONS, getNotifications} from "@redux/notification/action";
import Notification from "./Notification";

const NotificationsList = () => {
  const dispatch = useDispatch();
  const {notifications, pageNumber, totalPages, loading} = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(ACTIONS.resetGetNotifications());
    dispatch(getNotifications());
  }, []);

  const toggleVisible = async (inView) => {
    if (inView && (pageNumber < totalPages)) {
      await dispatch(getNotifications());
    }
  }

  return (
    <BoxWrapper>
      {notifications.map(ntfn => <Notification key={ntfn?.id + ntfn?.key} notification={ntfn}/>)}
      {!loading && <InViewElement toggleVisible={toggleVisible}/>}
      {loading && (<Box sx={{position: 'relative', pt: 3, pb: 3}}>
        <CircularLoader/>
      </Box>)}
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  borderTop: `1px solid ${theme.palette.border.main}`,
}))

export default NotificationsList;