import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {Box, Menu, MenuItem} from "@mui/material";
import PropTypes from "prop-types";

const DropDownMenu = ({clickElement: ClickElement, items, menuClick, itemKey}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<Box>
      <Box
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ClickElement/>
      </Box>
      <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}
      >
        {items.map((Item, i) => {
          return (<MenuItem key={itemKey + i} onClick={() => menuClick(i, setAnchorEl)}>
            <Item/>
          </MenuItem>)
        })}
      </MenuWrapper>
    </Box>
  );
}

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',
    backgroundColor: theme.palette.background.main,

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        padding: '11px 15px',

        '& > .IconByName': {
          color: theme.palette.primary.main,
        },

        '&:last-child': {
          borderBottom: 'none',
        },

        '& .MuiTouchRipple-root': {
          display: 'none'
        },

        '&:hover': {
          backgroundColor: theme.palette.background[1],
        }
      }
    }
  },
}));

DropDownMenu.propTypes = {
  clickElement: PropTypes.func,
  items: PropTypes.array,
  menuClick: PropTypes.func,
  itemKey: PropTypes.string.isRequired,
}
export default DropDownMenu;
