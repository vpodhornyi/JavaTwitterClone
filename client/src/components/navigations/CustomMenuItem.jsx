import React from "react";
import PropTypes from "prop-types";
import {MenuItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import IconByName from "@components/icons/IconByName";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

const CustomMenuItem = ({iconName, text, iconStyle, textStyle}) => {
  const CustomBox = styled(Box)(styles);

  return (
    <CustomBox>
      <MenuItem>
        <ListItemIcon>
          <IconByName iconName={iconName} iconStyle={iconStyle}/>
        </ListItemIcon>
        <ListItemText>
          <Typography variant='body1' sx={textStyle}>{text}</Typography>
        </ListItemText>
      </MenuItem>
    </CustomBox>
  );
}

CustomMenuItem.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
  iconStyle: PropTypes.object,
  textStyle: PropTypes.object,
}

const styles = ({theme}) => ({
  display: 'flex',
  cursor: 'pointer',
  color: theme.palette.action.active,

  '& .MuiMenuItem-root': {
    padding: 15,
  },

  '& .MuiTypography-root': {
    fontSize: '1.254rem'
  },

  '& > .MuiMenuItem-root > .MuiListItemIcon-root > .MuiSvgIcon-root': {
    fontSize: '1.875rem !important',
  },
  '& > .MuiMenuItem-root > .MuiListItemIcon-root': {
    minWidth: '1.875rem !important'
  },
  '& > .MuiMenuItem-root > .MuiListItemText-root': {
    marginLeft: 14,
    [theme.breakpoints.down('xl')]: {
      display: 'none'
    }
  },
  '&:hover > .MuiMenuItem-root': {
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  '& .MuiTouchRipple-root': {
    display: 'none'
  },
  active: {
    '& .MuiListItemText-root': {
      display: 'none',
    },
  }
});

export default CustomMenuItem;
