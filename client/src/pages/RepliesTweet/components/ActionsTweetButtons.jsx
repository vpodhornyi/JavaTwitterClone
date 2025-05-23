import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import {CustomIconButton, RetweetButton} from "@components";
import {useDebouncedCallback} from "use-debounce";
import {likeTweet, bookmarkTweet} from "@redux/tweet/action";
import {PATH} from "@utils/constants";

const ActionsTweetButtons = ({tweet}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const like = useDebouncedCallback(() => dispatch(likeTweet(tweet.id)), 300);
  const bookmark = useDebouncedCallback(() => dispatch(bookmarkTweet(tweet.id)), 300);

  return (<BoxWrapper onClick={e => e.stopPropagation()}>
        <Link
            to={PATH.COMPOSE.TWEET}
            state={{background: location, tweetAction: {tweet, isReplyTweet: true}}}
        >
          <Box className={tweet?.isTweetReplied ? 'Reply Reply_active' : 'Reply'}>
            <CustomIconButton name="ChatBubbleOutlineOutlined"/>
          </Box>
        </Link>
        <RetweetButton tweet={tweet} showCounter={false}/>
        <Box className={tweet?.isTweetLiked ? 'Like Like_active' : 'Like'} onClick={like}>
          <CustomIconButton name={tweet?.isTweetLiked ? 'Favorite' : 'FavoriteBorder'}/>
        </Box>
        <Box className={tweet?.isTweetInBookmark ? 'Bookmark Bookmark_active' : 'Bookmark'} onClick={bookmark}>
          <CustomIconButton name={tweet?.isTweetInBookmark ? 'BookmarkAdd' : 'BookmarkAddOutlined'}/>
        </Box>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '2px 0',
  borderBottom: `1px solid ${theme.palette.border.main}`,

  '& .IconByName': {
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

  '& .Reply_active': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
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

  '& .Retweet_active': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(0, 186, 124)',
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

  '& .View_active': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
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

  '& .Bookmark_active': {
    '& .MuiTypography-root': {
      transition: '0.5s',
      color: 'rgb(29, 155, 240)',
    },


    '& .IconByName': {
      color: 'rgb(29, 155, 240)',
    },
  }
}));

ActionsTweetButtons.propTypes = {
  tweet: PropTypes.object,
}
export default ActionsTweetButtons;
