import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {PATH} from "../../../../utils/constants";
import {moment} from "@utils";
import TweetFooter from "./TweetFooter";

const Tweet = ({tweet}) => {
  return (
    <BoxWrapper>
      <Link
        to={PATH.USER.profile(tweet?.user?.userTag)}
        className="AvatarLink">
        <Avatar className="Avatar" src={tweet?.user?.avatarImgUrl}/>
      </Link>
      <Box sx={{width: '100%'}}>
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
        <Typography>{tweet.body}</Typography>
        <Box className="ImagesBox">
          {tweet?.images.length > 0 && tweet?.images.map((item, i) => <img key={item.key} src={item.imgUrl}  alt=""/>)}
        </Box>
        <TweetFooter/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  padding: '12px 16px 0 16px',
  borderBottom: `1px solid ${theme.palette.border.main}`,

  '& .AvatarLink': {
    marginRight: 12,
  },

  '& .ImagesBox': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    '& img': {
      marginTop: 12,
      borderRadius: '16px',
      maxWidth: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  },
}));

Tweet.propTypes = {
  tweet: PropTypes.object,
}
export default Tweet;
