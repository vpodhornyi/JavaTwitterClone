import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDebouncedCallback} from "use-debounce";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import InputBase from "@mui/material/InputBase";

import {IconByName} from "@components";
import {searchUser} from "@redux/chat/action";
import {ACTIONS} from "@redux/explore/action";


const Header = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { searchText } = useSelector(state => state.explore);
  const debounced = useDebouncedCallback(async text => {
    if (text.trim() !== '') {
      // setLoading(true);
      const users = await dispatch(searchUser({text}));
      dispatch(ACTIONS.setFoundedUsers(users));
      // setLoading(false);
    } else {
      dispatch(ACTIONS.setFoundedUsers([]));
    }
  }, 500);

  const onChange = (e) => {
    dispatch(ACTIONS.setSearchText(e.target.value));
    debounced(e.target.value);
  }

  return (
    <BoxWrapper>
      <Search>
        <Box className='SearchIconWrapper'>
          <IconByName iconName='SearchOutlined'/>
        </Box>
        <StyledInputBase
          inputRef={inputRef}
          value={searchText}
          onChange={onChange}
          placeholder="Search Twitter"
          inputProps={{'aria-label': 'search'}}
        />
      </Search>
    </BoxWrapper>
  );
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
}));

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 20,
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: 'rgb(239, 243, 244)',
  width: '100%',

  '& .SearchIconWrapper': {
    position: 'absolute',
    top: 8,
    left: 17,
  },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default Header;
