import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import CounterButton from "./CounterButton";
import {CustomIconButton} from "../../../../components";
import {likeTweet} from "@redux/tweet/action";

const Index = ({tweet}) => {
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likeTweet(tweet.id));
  }

  return (
    <BoxWrapper>
      <Box className="Reply">
        <CounterButton name="ChatBubbleOutlineOutlined" count={45}/>
      </Box>
      <Box className="Retweet">
        <CounterButton name="FlipCameraAndroid" count={500}/>
      </Box>
      <Box className={tweet?.isTweetLiked ? 'Like Like_active' : 'Like' } onClick={like}>
        <CounterButton name={tweet?.isTweetLiked ? 'Favorite' : 'FavoriteBorder'} count={tweet?.likesCount}/>
      </Box>
      <Box className="View">
        <CounterButton name="VisibilityOutlined" count={5000}/>
      </Box>
      <Box className="Bookmark">
        <CustomIconButton name="BookmarkAddOutlined"/>
      </Box>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  maxWidth: '425px',
  display: 'flex',
  padding: '5px 0',
  justifyContent: 'space-between',
  columnGap: '8px',

  '& .IconByName': {
    fontSize: '1.2rem',
    color: theme.typography.body2.color,
  },

  '& .Reply:hover': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
    },

    '& .MuiButtonBase-root': {
      transition: '0.5s',
      backgroundColor: 'rgba(29, 155, 240, 0.2)',
    },

    '& .IconByName': {
      color: 'rgb(29, 155, 240)',
    },
  },

  '& .Retweet:hover': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(0, 186, 124)',
    },

    '& .MuiButtonBase-root': {
      transition: '0.5s',
      backgroundColor: 'rgba(0, 186, 124, 0.2)',
    },

    '& .IconByName': {
      color: 'rgb(0, 186, 124)',
    },
  },

  '& .Like:hover': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(249, 24, 128)',
    },

    '& .MuiButtonBase-root': {
      transition: '0.5s',
      backgroundColor: 'rgba(249, 24, 128, 0.2)',
    },

    '& .IconByName': {
      color: 'rgb(249, 24, 128)',
    },
  },

  '& .Like_active': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(249, 24, 128)',
    },

    '& .IconByName': {
      color: 'rgb(249, 24, 128)',
    },
  },

  '& .View:hover': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
    },

    '& .MuiButtonBase-root': {
      transition: '0.5s',
      backgroundColor: 'rgba(29, 155, 240, 0.2)',
    },

    '& .IconByName': {
      color: 'rgb(29, 155, 240)',
    },
  },

  '& .Bookmark:hover': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
    },

    '& .MuiButtonBase-root': {
      transition: '0.5s',
      backgroundColor: 'rgba(29, 155, 240, 0.2)',
    },

    '& .IconByName': {
      color: 'rgb(29, 155, 240)',
    },
  },
}));

Index.propTypes = {
  tweet: PropTypes.object,
}

export default Index;
