import React from "react";
import {Avatar, Box, Typography, styled} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {PATH} from "@utils/constants";

const Notification = ({notification}) => {
  const {message, userInitiator} = notification;
  return (
    <BoxWrapper>
      <Box className="AvatarLinkBox">
        <Link className="AvatarLink"
              to={PATH.USER.profile(userInitiator?.userTag)}>
          <Avatar className="Avatar" src={userInitiator?.avatarImgUrl}/>
        </Link>
      </Box>
      <Typography>{message}</Typography>
    </BoxWrapper>
  )
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: `1px solid ${theme.palette.border.main}`,

  '& .AvatarLinkBox': {
    marginRight: 12,

    '& .AvatarLink': {
      display: 'block',
      marginBottom: '5px',
    }
  },
}))

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification;