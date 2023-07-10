import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

import CounterButton from "./CounterButton";
import {CustomIconButton} from "../../../../components";

const Index = ({item}) => {

  return (
    <BoxWrapper>
      <Box className="Reply">
        <CounterButton name="ChatBubbleOutlineOutlined"/>
      </Box>
      <Box className="Retweet">
        <CounterButton name="FlipCameraAndroid"/>
      </Box>
      <Box className="Like">
        <CounterButton name="FavoriteBorder"/>
      </Box>
      <Box className="View">
        <CounterButton name="VisibilityOutlined"/>
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

  '& .Reply:hover': {
    '& .MuiTypography-root': {
      transition: '0.8s',
      color: 'red',
    },

    '& .MuiButtonBase-root': {
      transition: '0.8s',
      color: 'red',
      backgroundColor: 'red',
    },
  },

  '& .Retweet:hover': {
    '& .MuiTypography-root': {
      transition: '0.8s',
      color: 'blue',
    },

    '& .MuiButtonBase-root': {
      transition: '0.8s',
      color: 'blue',
      backgroundColor: 'blue',
    },
  },

  '& .Like:hover': {
    '& .MuiTypography-root': {
      transition: '0.8s',
      color: 'green',
    },

    '& .MuiButtonBase-root': {
      transition: '0.8s',
      color: 'green',
      backgroundColor: 'green',
    },
  },

  '& .View:hover': {
    '& .MuiTypography-root': {
      transition: '0.8s',
      color: 'blue',
    },

    '& .MuiButtonBase-root': {
      transition: '0.8s',
      color: 'blue',
      backgroundColor: 'blue',
    },
  },

  '& .Bookmark:hover': {
    '& .MuiTypography-root': {
      transition: '0.8s',
      color: 'blue',
    },

    '& .MuiButtonBase-root': {
      transition: '0.8s',
      color: 'blue',
      backgroundColor: 'blue',
    },
  },
}));

Index.propTypes = {
  item: PropTypes.object,
}

export default Index;
