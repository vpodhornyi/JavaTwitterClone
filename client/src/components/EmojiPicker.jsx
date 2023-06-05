import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Box, Menu} from "@mui/material";
import PropTypes from "prop-types";
import EmojiPickerReact from "emoji-picker-react";
import {CustomIconButton} from "./buttons";

const EmojiPicker = ({addEmoji, inputRef}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (fieldName) => {
    setAnchorEl(null);
    inputRef.current.focus();
  };

  return (
      <BoxWrapper>
        <Box onClick={handleClick}>
          <CustomIconButton color='primary' name='SentimentSatisfiedAltOutlined' iconSize='small'/>
        </Box>
        <MenuWrapper
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
        >
          <EmojiPickerReact onEmojiClick={addEmoji} height={400} width={320} skinTonesDisabled={true}/>
        </MenuWrapper>
      </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  '& .EmojiPickerReact': {
    border: '0px !important',
    borderRadius: '16px !important',
    backgroundColor: theme.palette.background.main,
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',

    '& .epr-emoji-category-label': {
      backgroundColor: `${theme.palette.background.main} !important`,
    },

    '& button.epr-emoji img:hover': {
      backgroundColor: `${theme.palette.primary.alpha} !important`,
    },

    '& button.epr-emoji:focus img': {
      backgroundColor: `${theme.palette.primary.alpha} !important`,
    },

    '& .epr-search-container input.epr-search': {
      backgroundColor: `${theme.palette.background.main} !important`,
      borderRadius: '20px !important',
      border: `2px solid ${theme.palette.primary.main} !important`
    },

    '& .epr-preview': {
      borderTop: `1px solid ${theme.palette.border.main}`
    }
  }
}));

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '16px !important',
    backgroundColor: theme.palette.background.main,
  },

  '& .EmojiPickerReact': {
    border: '0px !important',
    backgroundColor: theme.palette.background.main,

    '& .epr-emoji-category-label': {
      backgroundColor: `${theme.palette.background.main} !important`,
    },

    '& button.epr-emoji img:hover': {
      backgroundColor: `${theme.palette.primary.alpha} !important`,
    },

    '& button.epr-emoji:focus img': {
      backgroundColor: `${theme.palette.primary.alpha} !important`,
    },

    '& .epr-search-container input.epr-search': {
      backgroundColor: `${theme.palette.background.main} !important`,
      borderRadius: '20px !important',
      border: `2px solid ${theme.palette.primary.main} !important`
    },

    '& .epr-preview': {
      borderTop: `1px solid ${theme.palette.border.main}`
    }
  }
}));


EmojiPicker.propTypes = {
  addEmoji: PropTypes.func,
  inputRef: PropTypes.object,
}
export default EmojiPicker;
