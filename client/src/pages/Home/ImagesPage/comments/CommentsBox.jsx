import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {Avatar, Box, Typography} from "@mui/material";
import {PATH} from "@utils/constants";
import {moment} from "@utils";
import TweetFooter from "@components/Tweet/TweetFooter";
import {styled} from "@mui/material/styles";
import MoreTweetActionsButton from "@components/Tweet/MoreTweetActionsButton";

const CommentsBox = ({tweet}) => {
  return <BoxWrapper>
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
            <Typography sx={{fontWeight: 600}}>{tweet?.user.name}</Typography>
            <Typography variant='body2'>@{tweet?.user?.userTag}</Typography>
          </Box>
        </Box>
      </Box>
      <MoreTweetActionsButton tweet={tweet}/>
    </Box>
    <Typography sx={{mt: '11px'}}>{tweet.body}</Typography>
    <Typography variant='body2' sx={{mt: '11px'}}>
      {moment(tweet?.createdAt).format('h:mm A - MMMM D, YYYY')}
    </Typography>
    <TweetFooterWrapper>
      <TweetFooter tweet={tweet}/>
    </TweetFooterWrapper>
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({
  minWidth: '350px',
  backgroundColor: theme.palette.background.main,
  height: '100vh',
  padding: '10px 15px 0 15px',
  color: 'black',
  borderLeft: `1px solid ${theme.palette.border.main}`,
}))

const TweetFooterWrapper = styled(Box)(({theme}) => ({
  marginTop: '11px',
  borderTop: `1px solid ${theme.palette.border.main}`,
  borderBottom: `1px solid ${theme.palette.border.main}`,
}))

CommentsBox.propTypes = {
  tweet: PropTypes.object,
}

export default CommentsBox;