import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {useDebouncedCallback} from "use-debounce";
import PropTypes from "prop-types";

import CounterButton from "./CounterButton";
import RetweetButton from "./RetweetButton";
import {CustomIconButton} from "@components";
import {likeTweet, bookmarkTweet} from "@redux/tweet/action";
import {PATH} from "@utils/constants";

const TweetFooter = ({tweet}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const like = useDebouncedCallback(() => dispatch(likeTweet(tweet.id)), 300);
  const bookmark = useDebouncedCallback(() => {
    const isBookmarks = location.pathname === PATH.BOOKMARKS;
    dispatch(bookmarkTweet(tweet.id, isBookmarks))
  }, 300);

  return (
      <BoxWrapper>
        <Box onClick={e => e.stopPropagation()}>
          <Link
              to={PATH.COMPOSE.TWEET}
              state={{background: location, tweetAction: {tweet, isReplyTweet: true}}}
          >
            <Box className={tweet?.isTweetReplied ? 'Reply Reply_active' : 'Reply'}>
              <CounterButton name="ChatBubbleOutlineOutlined" count={tweet?.repliesTweetCount}/>
            </Box>
          </Link>
        </Box>
        <RetweetButton tweet={tweet}/>
        <Box onClick={e => e.stopPropagation()}>
          <Box className={tweet?.isTweetLiked ? 'Like Like_active' : 'Like'} onClick={like}>
            <CounterButton name={tweet?.isTweetLiked ? 'Favorite' : 'FavoriteBorder'} count={tweet?.likesCount}/>
          </Box>
        </Box>
        <Box className={tweet?.isTweetViewed ? 'View View_active' : 'View'} onClick={e => e.stopPropagation()}>
          <CounterButton name={tweet?.isTweetViewed ? 'Visibility' : 'VisibilityOutlined'}
                         count={tweet?.viewsCount}/>
        </Box>
        <Box onClick={e => e.stopPropagation()}>
          <Box className={tweet?.isTweetInBookmark ? 'Bookmark Bookmark_active' : 'Bookmark'} onClick={bookmark}>
            <CustomIconButton name={tweet?.isTweetInBookmark ? 'BookmarkAdd' : 'BookmarkAddOutlined'}/>
          </Box>
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

TweetFooter.propTypes = {
  tweet: PropTypes.object,
}

export default TweetFooter;
