import React from "react";
import {useDispatch} from "react-redux";
import {Box, Typography} from "@mui/material";

import {DropDownMenu, MoreButton} from "@components";
import {clearBookmarks} from "@redux/tweet/bookmark/action";

const items = [
  () => (<Box sx={{display: 'flex', alignItems: 'center'}}>
    <Typography color='red' fontWeight='bold' variant='body1'>Clear all bookmarks</Typography>
  </Box>)
]

const ClearAllBookmarks = () => {
  const dispatch = useDispatch();
  const menuClick = (index, setAnchorEl) => {
    switch (index) {
      case 0: {
        dispatch(clearBookmarks())
        setAnchorEl(null);
      }
    }
  }

  return <DropDownMenu
    clickElement={MoreButton}
    items={items}
    menuClick={menuClick}
    itemKey='clear-all-bookmarks-button'
  />
}

export default ClearAllBookmarks;
