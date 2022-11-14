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

const CustomFabButton = ({customStyle, name, iconName, fontWeight = 'fontWeightMedium'}) => {

  const FabWrapper = styled(Fab)(({theme}) => ({...def(theme), ...customStyle}));

  return (
    <FabWrapper variant="extended">
      {/*{iconName && <IconByName iconName={iconName}/>}*/}
      <Typography variant='body1'>{name}</Typography>
    </FabWrapper>
  );
};

CustomFabButton.propTypes = {
  customStyle: PropTypes.any,
  name: PropTypes.string,
  iconName: PropTypes.string,
  fontWeight: PropTypes.string,
}

export default CustomFabButton;
