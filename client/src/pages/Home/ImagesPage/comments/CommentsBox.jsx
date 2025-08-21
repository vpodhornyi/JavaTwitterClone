import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {Avatar, Box, Typography} from "@mui/material";
import {PATH} from "@utils/constants";
import {moment} from "@utils";

const CommentsBox = ({tweet}) => {
  return <Box sx={{
    minWidth: '350px',
    backgroundColor: 'white',
    height: '100vh',
    padding: '10px 15px 0 15px',
    color: 'black'
  }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
    }}>
      <Link
        onClick={e => e.stopPropagation()}
        to={PATH.USER.profile(tweet?.user?.userTag)}
        className="AvatarLink">
        <Avatar className="Avatar" src={tweet?.user?.avatarImgUrl}/>
      </Link>
      <Box sx={{width: '100%'}}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{display: 'flex', flexDirection: 'column', ml: '5px'}}>
            <Typography sx={{fontWeight: 600, color: 'black'}}>{tweet?.user.name}</Typography>
            <Typography variant='body2'>@{tweet?.user?.userTag}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    <Typography sx={{mt: '11px', color: 'black'}}>{tweet.body}</Typography>
    <Typography variant='body2' sx={{mt: '11px'}}>
      {moment(tweet?.createdAt).format('h:mm A - MMMM D, YYYY')}
    </Typography>
  </Box>
}

CommentsBox.propTypes = {
  tweet: PropTypes.object,
}
export default CommentsBox;