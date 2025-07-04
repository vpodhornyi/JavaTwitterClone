import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";

import {getNotifications} from "@redux/notification/action";


const NotificationsList =() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <Box>!!!</Box>
  )
}

export default NotificationsList;