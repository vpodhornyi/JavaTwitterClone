import React from "react";
import {styled} from "@mui/material/styles";
import {Box, IconButton} from "@mui/material";
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined";

const MoreButton = () => {

  return (
    <BoxWrapper>
      <IconButton
        color='action'
        name='MoreHorizOutlined'
        title='More'
        size='small'>
        <MoreHorizOutlined/>
      </IconButton>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .MuiButtonBase-root:hover': {
    transition: '0.5s',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.alpha,
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  }
}));

export default MoreButton;
