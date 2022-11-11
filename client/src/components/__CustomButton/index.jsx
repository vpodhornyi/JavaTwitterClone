import * as React from 'react';
import {useDispatch} from "react-redux";
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import {Typography} from "@mui/material";
import PropTypes from "prop-types";
import IconByName from "../icons/IconByName";

const def = theme =>  ({
  // width: '100%',
  textTransform: 'none',
  color: '#000000',
  boxShadow: 'none',
  // border: '1px solid #DDDFE2',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: '#DBE7F0',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '& .MuiTouchRipple-root': {
    display: 'none'
  },
});

const Voo = ({customStyle, name, iconName, onclickAction, fontWeight = 'fontWeightMedium'}) => {
  const dispatch = useDispatch();

  const Foo = styled(Fab)(({theme}) => ({...def(theme), ...customStyle}));

  return (
    <Foo variant="extended" onClick={() => dispatch(onclickAction())}>
      {/*{iconName && <IconByName iconName={iconName}/>}*/}
      <Typography variant='body1'>{name}</Typography>
    </Foo>
  );
};

Voo.propTypes = {
  customStyle: PropTypes.any,
  name: PropTypes.string,
  iconName: PropTypes.string,
  fontWeight: PropTypes.string,
  onclickAction: PropTypes.func,
}

export default Voo;