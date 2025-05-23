import React from "react";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {PATH} from "@utils/constants";
import {moment} from "@utils";

const ReplyTweet = ({tweet}) => {
  return (
      <BoxWrapper>
        <Box className="AvatarLinkBox">
          <Link className="AvatarLink"
              to={PATH.USER.profile(tweet?.user?.userTag)}>
            <Avatar className="Avatar" src={tweet?.user?.avatarImgUrl}/>
          </Link>
          <Box className="VerticalLine"/>
        </Box>
        <Box sx={{width: '100%', pb: 5}}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{display: 'flex'}}>
              <Typography sx={{fontWeight: 600}}>{tweet?.user.name}</Typography>
              <Typography variant='body2' sx={{ml: '5px'}}>@{tweet?.user?.userTag}</Typography>
              <Typography variant='body2' sx={{
                '&:before': {
                  content: '"·"',
                  marginLeft: '5px',
                  marginRight: '5px',
                }
              }}>{moment(tweet?.createdAt).fromNow(true)}</Typography>
            </Box>
          </Box>
          <Typography>{tweet.body}</Typography>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
  height: '100%',

  '& .AvatarLinkBox': {
    marginRight: 12,

    '& .AvatarLink': {
      display: 'block',
      marginBottom: '5px',
    }
  },

  '& .VerticalLine': {
    height: 'calc(100% - 70px)',
    width: '2px',
    padding: '1px',
    backgroundColor: theme.palette.border.main,
    margin: '0 auto',
  }
}));

ReplyTweet.propTypes = {
  tweet: PropTypes.object,
}
export default ReplyTweet;
